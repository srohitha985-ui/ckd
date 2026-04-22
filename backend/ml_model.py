import pandas as pd
import numpy as np
import pickle
import json

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.utils import shuffle


def train_and_save_model():
    # Load dataset
    data = pd.read_csv("data/kidney_disease.csv")

    # Clean data
    data.replace('?', np.nan, inplace=True)
    data = data.dropna()

    # Encode target
    data['classification'] = data['classification'].replace({
        'ckd': 1,
        'notckd': 0
    })

    # Features & target
    X = data.drop(columns=['classification'])
    y = data['classification']

    # Convert numeric
    for col in X.columns:
        X[col] = pd.to_numeric(X[col], errors='coerce')

    # Convert categorical → dummy
    X = pd.get_dummies(X, drop_first=True)

    # Shuffle
    X, y = shuffle(X, y, random_state=42)

    # Save columns
    columns = X.columns.tolist()

    # Split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=0.3,
        random_state=42,
        stratify=y
    )

    # 🔥 Add slight noise (avoid overfitting)
    X_train = X_train + np.random.normal(0, 0.01, X_train.shape)

    # 🔥 Better realistic model
    pipeline = Pipeline([
        ("scaler", StandardScaler()),
        ("model", RandomForestClassifier(
            n_estimators=30,
            max_depth=4,
            min_samples_split=10,
            random_state=42
        ))
    ])

    # Train
    pipeline.fit(X_train, y_train)

    # Predict
    preds = pipeline.predict(X_test)

    # ✅ REAL METRICS (TEST DATA ONLY)
    acc = accuracy_score(y_test, preds)
    precision = precision_score(y_test, preds)
    recall = recall_score(y_test, preds)
    f1 = f1_score(y_test, preds)

    print(f"✅ Test Accuracy: {acc*100:.2f}%")
    print(f"✅ Precision: {precision*100:.2f}%")
    print(f"✅ Recall: {recall*100:.2f}%")
    print(f"✅ F1 Score: {f1*100:.2f}%")

    # Feature importance
    rf_model = pipeline.named_steps["model"]
    importance = rf_model.feature_importances_

    feature_importance = dict(
        sorted(zip(columns, importance), key=lambda x: x[1], reverse=True)
    )

    # ✅ SAVE REAL VALUES
    metrics = {
        "accuracy": float(acc),
        "precision": float(precision),
        "recall": float(recall),
        "f1_score": float(f1),
        "feature_importance": feature_importance
    }

    with open("models/metrics.json", "w") as f:
        json.dump(metrics, f, indent=4)

    # Save model
    with open("models/random_forest_model.pkl", "wb") as f:
        pickle.dump(pipeline, f)

    # Save columns
    with open("models/columns.pkl", "wb") as f:
        pickle.dump(columns, f)

    print("🎯 Model saved successfully with REAL metrics!")


if __name__ == "__main__":
    train_and_save_model()