import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

def load_and_preprocess_data(path):
    # Load data
    df = pd.read_csv(path)

    # Replace '?' with NaN
    df.replace('?', np.nan, inplace=True)

    # Drop missing values
    df = df.dropna()

    # Encode target
    df['classification'] = df['classification'].apply(
        lambda x: 1 if x == 'ckd' else 0
    )

    # Separate features
    X = df.drop(columns=['classification'])
    y = df['classification']

    # Convert all numeric columns
    for col in X.columns:
        X[col] = pd.to_numeric(X[col], errors='ignore')

    # 🔥 Convert categorical → dummy
    X = pd.get_dummies(X, drop_first=True)

    # Scale
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    return X_scaled, y, scaler, X.columns