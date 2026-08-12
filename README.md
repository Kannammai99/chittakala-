# Chittakala API

Chittakala is a mobile-first creative-wellness platform that helps users intentionally transition from passive scrolling to active creation through Indian folk art (Warli & Kolam) and Gemini AI reflection.

---

## Project Structure

```
chittakala/
├── app/
│   ├── __init__.py
│   ├── main.py
│   └── api/
│       ├── __init__.py
│       ├── art_forms.py
│       └── health.py
├── tests/
│   ├── __init__.py
│   └── api/
│       ├── __init__.py
│       ├── test_art_forms.py
│       └── test_health.py
├── .gitignore
├── pyrightconfig.json
├── README.md
└── requirements.txt
```

---

## Setup Instructions

### 1. Create Virtual Environment
```bash
python -m venv .venv
```

### 2. Install Dependencies
```powershell
.\.venv\Scripts\pip.exe install -r requirements.txt
```

---

## Running the Application in Terminal

### Direct Command (No Environment Activation Required)
Run Uvicorn directly from `.venv`:

```powershell
.\.venv\Scripts\uvicorn.exe app.main:app --reload
```

### With Activated Environment

1. **Enable script execution in PowerShell** (if blocked):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
   ```
2. **Activate environment**:
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```
3. **Start server**:
   ```bash
   uvicorn app.main:app --reload
   ```

> 🌐 **Server Endpoints**:
> - **Root**: http://127.0.0.1:8000/
> - **Health Check**: http://127.0.0.1:8000/health
> - **Art Forms API**: http://127.0.0.1:8000/art-forms
> - **Interactive Swagger Docs**: http://127.0.0.1:8000/docs
> - **ReDoc Documentation**: http://127.0.0.1:8000/redoc

---

## Running Tests in Terminal

### Direct Command (Recommended)
Run `pytest` directly using `.venv`:

```powershell
.\.venv\Scripts\pytest.exe -v
```

### With Activated Environment
```powershell
pytest -v
```

### Useful Test Commands

```powershell
# Run a specific test file
.\.venv\Scripts\pytest.exe tests/api/test_art_forms.py -v

# Run a specific test by function name
.\.venv\Scripts\pytest.exe -k "test_get_art_forms_endpoint" -v
```

---

## Troubleshooting PowerShell Errors

- **`Activate.ps1 cannot be loaded because running scripts is disabled`**:
  Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process` in PowerShell before activating.
- **`pytest / uvicorn : The term is not recognized`**:
  Use the direct executable path `.\.venv\Scripts\pytest.exe` or `.\.venv\Scripts\uvicorn.exe`.
