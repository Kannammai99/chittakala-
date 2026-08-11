# Chittakala API

Chittakala is a mobile-first creative-wellness platform that helps users intentionally transition from passive scrolling to active creation through Indian folk art (Warli & Kolam) and Gemini AI reflection.

## Project Structure

```
chittakala/
├── app/
│   ├── __init__.py
│   ├── main.py
│   └── api/
│       ├── __init__.py
│       └── health.py
├── tests/
│   ├── __init__.py
│   └── api/
│       ├── __init__.py
│       └── test_health.py
├── .gitignore
├── README.md
└── requirements.txt
```

## Setup Instructions

1. **Create and activate virtual environment**:
   ```bash
   python -m venv .venv
   # On Windows PowerShell:
   .venv\Scripts\Activate.ps1
   ```

2. **Install dependencies**:
   ```bash
   .venv\Scripts\pip install -r requirements.txt
   ```

3. **Run Dev Server**:
   ```bash
   .venv\Scripts\uvicorn app.main:app --reload
   ```

4. **Run Tests**:
   ```bash
   .venv\Scripts\pytest
   ```
