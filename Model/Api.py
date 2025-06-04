from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
import joblib
import shap
import numpy as np
import os
from motor.motor_asyncio import AsyncIOMotorClient


# client = AsyncIOMotorClient("mongodb://localhost:27017")
# db = client.anxiety_project
# Load model
model = joblib.load("model.pkl")
DATASET_PATH = "social_anxiety_dataset.csv"
if os.path.exists(DATASET_PATH):
    df_dataset = pd.read_csv(DATASET_PATH)
else:
    df_dataset = pd.DataFrame()  # empty fallback

# Create FastAPI app
app = FastAPI(title="Social Anxiety Predictor")

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
    try:
        df = preprocess_input(input_data)
        prediction = model.predict(df)[0]
        return {"predicted_anxiety_level": round(float(prediction), 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/explain")
def explain_prediction(input_data: UserInput):
    try:
        df = preprocess_input(input_data)

        # Extract model components
        regressor = model.named_steps["regressor"]
        preprocessor = model.named_steps["preprocessor"]

        # Preprocess input
        X_processed = preprocessor.transform(df)

        # SHAP expects numeric input — use processed features
        explainer = shap.Explainer(regressor, X_processed)
        shap_values = explainer(X_processed)

        # Use transformed feature names
        input_feature_names = preprocessor.get_feature_names_out()
        values = shap_values.values[0]
        result = {
            name: round(val, 3)
            for name, val in zip(input_feature_names, values)
        }

        return {
            "predicted_anxiety_level": round(float(model.predict(df)[0]), 2),
            "shap_feature_contributions": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
