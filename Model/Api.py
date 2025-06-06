from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
import joblib
import shap
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware



# Load model
model = joblib.load("model.pkl")
DATASET_PATH = "social-anxiety-dataset/enhanced_anxiety_dataset.csv"
if os.path.exists(DATASET_PATH):
    df_dataset = pd.read_csv(DATASET_PATH)
else:
    df_dataset = pd.DataFrame() 

# Create FastAPI app
app = FastAPI(title="Social Anxiety Predictor")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define input schema using Pydantic
class UserInput(BaseModel):
    Age: int
    Gender: str
    Occupation: str
    Sleep_Hours: float
    Physical_Activity_hrs_per_week: float
    Caffeine_Intake_mg_per_day: float
    Alcohol_Consumption_drinks_per_week: float
    Smoking: str
    Family_History_of_Anxiety: str
    Stress_Level_1_10: int
    Heart_Rate_bpm: int
    Breathing_Rate_breaths_per_min: int
    Sweating_Level_1_5: int
    Dizziness: str
    Medication: str
    Therapy_Sessions_per_month: int
    Recent_Major_Life_Event: str
    Diet_Quality_1_10: int

def preprocess_input(data: UserInput):
    """
    Convert UserInput data into a pandas DataFrame formatted to match
    the feature columns expected by the ML model pipeline.
    """
    df = pd.DataFrame([{
        "Age": data.Age,
        "Gender": data.Gender,
        "Occupation": data.Occupation,
        "Sleep Hours": data.Sleep_Hours,
        "Physical Activity (hrs/week)": data.Physical_Activity_hrs_per_week,
        "Caffeine Intake (mg/day)": data.Caffeine_Intake_mg_per_day,
        "Alcohol Consumption (drinks/week)": data.Alcohol_Consumption_drinks_per_week,
        "Smoking": data.Smoking,
        "Family History of Anxiety": data.Family_History_of_Anxiety,
        "Stress Level (1-10)": data.Stress_Level_1_10,
        "Heart Rate (bpm)": data.Heart_Rate_bpm,
        "Breathing Rate (breaths/min)": data.Breathing_Rate_breaths_per_min,
        "Sweating Level (1-5)": data.Sweating_Level_1_5,
        "Dizziness": data.Dizziness,
        "Medication": data.Medication,
        "Therapy Sessions (per month)": data.Therapy_Sessions_per_month,
        "Recent Major Life Event": data.Recent_Major_Life_Event,
        "Diet Quality (1-10)": data.Diet_Quality_1_10
    }])
    return df

@app.post("/predict")
def predict_anxiety(input_data: UserInput):
    """
    API endpoint to predict the anxiety level given user input data.
    - Preprocess the input into model-ready format
    - Use the trained model to predict anxiety level
    - Return the predicted anxiety score rounded to two decimals
    """
    try:
        df = preprocess_input(input_data)
        prediction = model.predict(df)[0]
        return {"predicted_anxiety_level": round(float(prediction), 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
