import sqlite3

DB_NAME = "ckd_history.db"

def create_connection():
    conn = sqlite3.connect(DB_NAME)
    return conn

def create_table():
    conn = create_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            prediction TEXT,
            confidence REAL,
            risk_level TEXT
        )
    """)

    conn.commit()
    conn.close()