import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import joblib

# Load dataset from CSV file
data = pd.read_csv('social-anxiety-dataset/enhanced_anxiety_dataset.csv')

# Target variable is 'Anxiety Level (1-10)'
y = data['Anxiety Level (1-10)']

# Features exclude target
X = data.drop(columns=['Anxiety Level (1-10)'])

# Identify categorical and numeric features based on your CSV format
categorical_features = [
    'Gender',
    'Occupation',
    'Smoking',
    'Family History of Anxiety',
    'Dizziness',
    'Medication',
    'Recent Major Life Event'
]

numeric_features = [
    'Age',
    'Sleep Hours',
    'Physical Activity (hrs/week)',
    'Caffeine Intake (mg/day)',
    'Alcohol Consumption (drinks/week)',
    'Stress Level (1-10)',
    'Heart Rate (bpm)',
    'Breathing Rate (breaths/min)',
    'Sweating Level (1-5)',
    'Therapy Sessions (per month)',
    'Diet Quality (1-10)'
]

# Pipeline for preprocessing numeric data
numeric_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# Pipeline for preprocessing categorical data
categorical_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

# Combine numeric and categorical preprocessors into one transformer,
# applying the appropriate preprocessing to each feature type
preprocessor = ColumnTransformer(transformers=[
    ('num', numeric_transformer, numeric_features),
    ('cat', categorical_transformer, categorical_features)
])

# Create a full pipeline with preprocessing and the Random Forest regressor model
model = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Split the data into training and testing sets (default test size 25%)
# Using a fixed random state for reproducibility
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)

# Train the model on the training data
model.fit(X_train, y_train)

# Save the trained model pipeline for later use
joblib.dump(model, 'model.pkl')
