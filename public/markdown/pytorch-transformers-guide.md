---
title: PyTorch & Transformers for NLP - A Practical Guide from Scratch
date: 2024-04-12
readTime: 16 min read
category: Deep Learning
author: Lokesh Tiwari
tags: [PyTorch, Transformers, NLP, HuggingFace, BERT, Tutorial]
slug: pytorch-transformers-guide
image: 🔥
---

## Introduction

PyTorch has become the go-to framework for researchers and practitioners building Deep Learning models, especially in NLP. Combined with the HuggingFace Transformers library, you have access to state-of-the-art pre-trained models in just a few lines of code.

This guide walks through my journey with PyTorch, from foundational concepts to fine-tuning production models.

## Why PyTorch Over TensorFlow?

Both are excellent, but PyTorch wins for me because:

1. **Dynamic computation graphs**: Define-by-run lets you debug easily
2. **Pythonic API**: Feels natural for Python developers
3. **Research-friendly**: Academia prefers PyTorch; cutting-edge papers use it
4. **Ecosystem**: Stable baselines, Lightning, geometric neural networks

```python
import torch
import torch.nn as nn

# PyTorch's simple elegance
x = torch.randn(batch_size, input_dim)
model = nn.Linear(input_dim, output_dim)
output = model(x)
```

## PyTorch Fundamentals

### Tensors: The Building Block

Tensors are multi-dimensional arrays. Unlike NumPy, they can run on GPUs:

```python
# CPU tensor
x_cpu = torch.randn(3, 4)

# GPU tensor (if CUDA available)
x_gpu = torch.randn(3, 4).cuda()

# Check device
print(x_gpu.device)  # cuda:0

# Easy movement between devices
x_gpu = x_cpu.to('cuda')
```

### Autograd: Automatic Differentiation

PyTorch automatically computes gradients—magic that powers deep learning:

```python
x = torch.tensor([2.0], requires_grad=True)
y = x**2 + 3*x + 1

y.backward()  # Compute gradients
print(x.grad)  # dy/dx = 2*x + 3 = 7.0 when x=2
```

### Building Neural Networks with `nn.Module`

Custom models inherit from `nn.Module`:

```python
class SimpleNet(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_dim, output_dim)
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

model = SimpleNet(input_dim=10, hidden_dim=64, output_dim=2)
```

## From Scratch to Production: Training Loop

A complete training loop includes data loading, forward pass, loss computation, backward pass, and optimization:

```python
import torch.optim as optim
from torch.utils.data import DataLoader

model = SimpleNet(input_dim=10, hidden_dim=64, output_dim=2)
optimizer = optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

# Training loop
for epoch in range(num_epochs):
    for batch_idx, (data, target) in enumerate(train_loader):
        # Move to GPU if available
        data, target = data.to('cuda'), target.to('cuda')
        
        # Forward pass
        output = model(data)
        loss = criterion(output, target)
        
        # Backward pass
        optimizer.zero_grad()  # Clear old gradients
        loss.backward()        # Compute new gradients
        optimizer.step()       # Update weights
        
        if batch_idx % 100 == 0:
            print(f'Epoch {epoch}, Loss: {loss.item():.4f}')
```

### Key Points:

- **`optimizer.zero_grad()`**: Gradients accumulate by default—clear them each step
- **`.to('cuda')`**: Move tensors to GPU for faster computation
- **`.item()`**: Extract scalar value from 1-element tensor
- **`requires_grad=True`**: Only these tensors compute gradients (saves memory)

## HuggingFace Transformers: Standing on Giants' Shoulders

HuggingFace provides pre-trained models that took weeks to train. You can fine-tune them on your data in hours.

### Loading a Pre-trained Model

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Load tokenizer and model
model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(
    model_name, 
    num_labels=2  # Binary classification
)

# Move to GPU
model = model.to('cuda')
```

### Tokenization: Converting Text to Numbers

Transformers don't understand words—they understand tokens:

```python
text = "I love machine learning!"

# Tokenize
encoded = tokenizer(
    text,
    padding='max_length',
    max_length=128,
    truncation=True,
    return_tensors='pt'
)

# Output contains:
# - input_ids: [101, 1045, 2572, 3698, 2926, 999, 102, 0, ...]
# - attention_mask: [1, 1, 1, 1, 1, 1, 1, 0, ...]
# - token_type_ids: [0, 0, 0, 0, 0, 0, 0, 0, ...]
```

**Special tokens:**
- `[CLS]` (token ID 101): Marks beginning, used for classification
- `[SEP]` (token ID 102): Separates sentences
- `[PAD]` (token ID 0): Padding for consistent batch sizes

### Fine-tuning BERT for Classification

```python
from torch.utils.data import Dataset, DataLoader

class TextDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_length=128):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_length = max_length
    
    def __len__(self):
        return len(self.texts)
    
    def __getitem__(self, idx):
        text = self.texts[idx]
        label = self.labels[idx]
        
        encoding = self.tokenizer(
            text,
            padding='max_length',
            max_length=self.max_length,
            truncation=True,
            return_tensors='pt'
        )
        
        return {
            'input_ids': encoding['input_ids'].squeeze(),
            'attention_mask': encoding['attention_mask'].squeeze(),
            'labels': torch.tensor(label)
        }

# Create data loader
dataset = TextDataset(texts, labels, tokenizer)
loader = DataLoader(dataset, batch_size=32, shuffle=True)

# Fine-tuning loop
optimizer = optim.AdamW(model.parameters(), lr=2e-5)

for epoch in range(3):
    for batch in loader:
        # Move to GPU
        batch = {k: v.to('cuda') for k, v in batch.items()}
        
        # Forward pass
        outputs = model(**batch)
        loss = outputs.loss
        
        # Backward pass
        optimizer.zero_grad()
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        
        print(f'Loss: {loss.item():.4f}')
```

**Why `clip_grad_norm_`?** 
Transformers can have exploding gradients. Clipping keeps them reasonable.

## Practical Tips from Experience

### 1. GPU Memory Management

Transformers are memory-hungry. If you get CUDA out of memory:

```python
# Reduce batch size
batch_size = 8  # Instead of 32

# Enable gradient accumulation
num_accumulation_steps = 4
for i, batch in enumerate(loader):
    outputs = model(**batch)
    loss = outputs.loss / num_accumulation_steps
    loss.backward()
    
    if (i + 1) % num_accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()

# Or use mixed precision
from torch.cuda.amp import autocast, GradScaler
scaler = GradScaler()
with autocast():
    outputs = model(**batch)
```

### 2. Validation & Monitoring

```python
model.eval()  # Set to evaluation mode (disables dropout)
with torch.no_grad():  # Don't compute gradients
    val_loss = 0
    for batch in val_loader:
        batch = {k: v.to('cuda') for k, v in batch.items()}
        outputs = model(**batch)
        val_loss += outputs.loss.item()

avg_val_loss = val_loss / len(val_loader)
print(f'Validation Loss: {avg_val_loss:.4f}')
model.train()  # Back to training mode
```

### 3. Saving & Loading Models

```python
# Save
torch.save(model.state_dict(), 'model.pt')

# Load
model = AutoModelForSequenceClassification.from_pretrained(model_name)
model.load_state_dict(torch.load('model.pt'))
```

### 4. Learning Rate Scheduling

Start with high LR, decrease over time:

```python
from torch.optim.lr_scheduler import LinearLR

scheduler = LinearLR(optimizer, start_factor=1.0, end_factor=0.1, total_iters=1000)

for batch in loader:
    loss = model(**batch).loss
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    scheduler.step()
```

## Real-World Example: Sentiment Analysis

Here's a complete example I used for my diabetes prediction project's preprocessing pipeline:

```python
from transformers import pipeline

# Use pre-trained pipeline (downloads + caches model)
classifier = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

texts = [
    "I love this!",
    "This is terrible",
    "Neutral statement"
]

results = classifier(texts)
# [{'label': 'POSITIVE', 'score': 0.99},
#  {'label': 'NEGATIVE', 'score': 0.98},
#  {'label': 'NEGATIVE', 'score': 0.51}]
```

## Common Mistakes & How to Avoid Them

1. **Forgetting `model.eval()`**: Dropout & batch norm behave differently in eval mode
2. **Wrong device placement**: Moving only input to GPU, not model → RuntimeError
3. **Not resetting gradients**: Gradients accumulate, causing incorrect updates
4. **Using too high learning rate**: BERT needs 1e-5 to 5e-5, not 0.01
5. **Ignoring class imbalance**: Accuracy lies; use weighted loss or stratified sampling

## Conclusion

PyTorch + HuggingFace Transformers democratized access to cutting-edge NLP. You don't need to train BERT from scratch—focus on fine-tuning for your specific task.

**The key insight**: Modern deep learning is about standing on giants' shoulders. Use pre-trained models, understand the fundamentals, and adapt to your problem.

---

**What NLP tasks are you interested in? Have you tried fine-tuning transformers? Share your experience in the comments!**
