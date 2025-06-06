This repository contains the full codebase for Social Anxiety Awareness Dashboard, a web-based interactive tool designed to help users understand how their lifestyle habits may relate to self-reported anxiety levels. The system integrates a machine learning backend with an intuitive frontend interface to support personalized predictions, interpretability, and behavioral reflection.

At its core, the project uses a Random Forest Regressor trained on over 10,000 anonymized responses from the Social Anxiety Dataset on Kaggle. The dataset includes a wide range of features, including sleep duration, caffeine and alcohol consumption, physical activity, and self-reported stress levels. After preprocessing, these features are used to predict an anxiety score on a continuous 1–10 scale. The trained model is saved and served to the frontend for real-time inference.

The frontend is built with React and styled using modern web components. It includes a user intake form where individuals enter their lifestyle and demographic information. After submitting, the system predicts and displays the user's anxiety score. A key visualization component is a 3D scatter plot, rendered with Plotly, which shows the relationship between key lifestyle variables and anxiety levels across the dataset. Users can see where they fall relative to the broader population, helping to contextualize their results. The 3D scatter plot allows the user to scroll, rotate, and zoom, as well as provides information about each datapoint when hovered over. The user's point is enlarged and bordered to make it more visible.

Overall, this project provides an accessible way to interact with predictive models and real survey data, allowing users to simulate lifestyle adjustments and observe potential effects on their anxiety score. The emphasis is on interpretability through visual comparison and interaction, rather than through complex model internals—making the tool suitable for broad audiences, including those without technical or clinical backgrounds.

Prerequisites

    Python 3.8+

    Node.js and npm (Node Package Manager) — recommended versions: Node 16+ and npm 7+

    A terminal or command prompt with Git installed (optional but recommended)

Backend Setup

    Clone the repository (if you haven't already):

        git clone git@github.com:vi31/ECS273_Social_Anxiety_DataViz.git
        cd ECS273_Social_Anxiety_DataViz/Model

    Create and activate a Python virtual environment (recommended):

        python3 -m venv venv
        source venv/bin/activate   # On Windows: venv\Scripts\activate

    Install Python dependencies:

        pip install -r requirements.txt

    Ensure the trained model file (model.pkl) is present in the backend directory.
    If not, run the training script:

        python model_ecs273.py

Frontend Setup

Install npm dependencies:

    npm install
    npm install react-plotly.js plotly.js

Execution
Backend

    Make sure you have Python 3.8+ and all required Python packages installed (see Installation).

    Navigate to the Model directory:

        cd Model

    Run the backend server:

        uvicorn Api:app --reload

This will start the API server on http://localhost:8000 by default.

Frontend

    Navigate to the frontend directory:

        cd src

    Start the React development server:

        npm run dev

    Open your browser and visit http://localhost:3000 to interact with the dashboard.