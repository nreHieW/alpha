from fastapi import FastAPI
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
from modelling import *
import uvicorn
import pandas as pd

load_dotenv()

app = FastAPI()
uri = f"mongodb+srv://{os.getenv('MONGODB_USERNAME')}:{os.getenv('MONGODB_DB_PASSWORD')}@{os.getenv('MONGODB_DB_NAME')}.kdnx4hj.mongodb.net/?retryWrites=true&w=majority&appName={os.getenv('MONGODB_DB_NAME')}"
client = MongoClient(uri, server_api=ServerApi("1"))
db = client[os.getenv("MONGODB_DB_NAME")]["dcf_inputs"]


@app.get("/")
def read_root():
    return {"Status": "OK"}


@app.post("/tickers")
def get_tickers():
    cursor = db.find({}, {"_id": 0, "Ticker": 1, "name": 1})
    res = list(cursor)
    return res
