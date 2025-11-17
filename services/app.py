import os
import math
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, text
from groq import Groq
from dotenv import load_dotenv
import uvicorn


# Load environment variables

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
DB_URL = os.getenv("DB_URL")

# Validate env vars
if not GROQ_API_KEY or not DB_URL:
    raise ValueError("❌ Missing environment variables: GROQ_API_KEY or DB_URL")


# Database and Groq client setup

engine = create_engine(DB_URL)
client = Groq(api_key=GROQ_API_KEY)


# FastAPI App Configuration

app = FastAPI(title="Chat With Data API")

# Allow frontend access (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to your frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request Body Model

class QueryRequest(BaseModel):
    query: str


# Schema Description (for LLM)

SCHEMA_DESCRIPTION = """
                        Table: analytics_data
                        Columns:
                        - vendor_name (text)
                        - invoice_id (text)
                        - invoice_date (text)
                        - sub_total (float)
                        - total_tax (float)
                        - invoice_total (float)
                    """


# Helper Function

def clean_for_json(df: pd.DataFrame):
    """Convert DataFrame to JSON-safe records."""
    records = df.to_dict(orient="records")
    cleaned = []
    for row in records:
        new_row = {}
        for k, v in row.items():
            if v is None or (isinstance(v, float) and (math.isnan(v) or math.isinf(v))):
                new_row[k] = None
            elif isinstance(v, (pd.Timestamp, pd.Timedelta)):
                new_row[k] = str(v)
            else:
                new_row[k] = v
        cleaned.append(new_row)
    return cleaned


# Main API Route

@app.post("/chat-with-data")
async def chat_with_data(req: QueryRequest):
    user_query = req.query

    try:
        # Step 1 — Create LLM prompt
        prompt = f"""
                   You are an expert PostgreSQL assistant.
                   Given this database schema:
                   {SCHEMA_DESCRIPTION}
                   Generate a valid SQL query (no markdown formatting, no explanations)
                   for the user request: "{user_query}"
                   """

        # Step 2 — Generate SQL using Groq LLM
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
        )

        sql_query = response.choices[0].message.content.strip()
        sql_query = sql_query.replace("```sql", "").replace("```", "").strip()

        # Step 3 — Ensure proper date casting
        if "invoice_date" in sql_query and "::date" not in sql_query:
            sql_query = sql_query.replace("invoice_date", "invoice_date::date")

        # Step 4 — Execute SQL query
        with engine.connect() as conn:
            df = pd.read_sql(text(sql_query), conn)

        # Step 5 — Clean and return results
        cleaned = clean_for_json(df)
        return {"generated_sql": sql_query, "results": cleaned}

    except Exception as e:
        return {"error": str(e)}


# Run Server

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
