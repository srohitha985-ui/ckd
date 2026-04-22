# CKD Prediction Web Application

A Chronic Kidney Disease prediction system built using:

- **ReactJS** (Frontend)
- **FastAPI** (Backend)
- **Machine Learning models** (Random Forest, SVM)
- **MongoDB / Local Storage**

## Folder Structure
- `frontend/` → React application  
- `backend/` → FastAPI application  

## How to Run the Project

### Backend (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

Frontend (React)

cd frontend
npm install
npm start

ML Model

Trained using Random Forest & SVM

Stored in backend models/ckd_model.pkl


---

# ✅ **8. Common Errors & Fixes**

### **1. Permission denied (publickey)**  
Use HTTPS instead of SSH.

### **2. Large file (>100MB)**  
Use Git LFS or remove the file.

### **3. Updates not pushing**
```bash
git pull --rebase origin main
git push
