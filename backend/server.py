from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pickle
import pandas as pd
from datetime import datetime
import json
from database import create_table, create_connection

app = FastAPI(title="CKD Prediction API")

# 🔥 CREATE TABLE ON START
create_table()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model + columns
with open("models/random_forest_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("models/columns.pkl", "rb") as f:
    columns = pickle.load(f)


# ✅ PREDICT API
@app.post("/predict")
async def predict_ckd(data: dict):
    try:
        if not data:
            raise HTTPException(status_code=400, detail="Input data is empty")

        # Convert to dataframe
        input_df = pd.DataFrame([data])

        # Convert categorical → dummy
        input_df = pd.get_dummies(input_df)

        # Match training columns
        input_df = input_df.reindex(columns=columns, fill_value=0)

        # Predict
        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]

        confidence = round(float(probability * 100), 2)

        # 🔥 FIXED RISK LOGIC
        if prediction == 1:
            risk = "High"
        else:
            risk = "Low"

        result = {
            "prediction": "CKD" if prediction == 1 else "No CKD",
            "confidence": confidence,
            "risk_level": risk
        }

        # 🔥 SAVE TO DATABASE
        conn = create_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO history (timestamp, prediction, confidence, risk_level)
            VALUES (?, ?, ?, ?)
        """, (
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            result["prediction"],
            result["confidence"],
            result["risk_level"]
        ))

        conn.commit()
        conn.close()

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ✅ HISTORY API (FROM DATABASE)
@app.get("/history")
async def get_history():
    try:
        conn = create_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT timestamp, prediction, confidence, risk_level
            FROM history
            ORDER BY id DESC
        """)

        rows = cursor.fetchall()
        conn.close()

        history = []
        for row in rows:
            history.append({
                "timestamp": row[0],
                "prediction": row[1],
                "confidence": row[2],
                "risk_level": row[3]
            })

        return history

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ✅ METRICS API
@app.get("/model-metrics")
async def get_model_metrics():
    try:
        with open("models/metrics.json", "r") as f:
            return json.load(f)
    except:
        raise HTTPException(status_code=404, detail="Metrics not found")