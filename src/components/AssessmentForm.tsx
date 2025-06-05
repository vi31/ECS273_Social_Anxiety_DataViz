import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ArrowLeft, ArrowRight } from 'lucide-react';

interface FormData {
  Age: number;
  Gender: string;
  Occupation: string;
  Sleep_Hours: number;
  Physical_Activity_hrs_per_week: number;
  Caffeine_Intake_mg_per_day: number;
  Alcohol_Consumption_drinks_per_week: number;
  Smoking: string;
  Family_History_of_Anxiety: string;
  Stress_Level_1_10: number;
  Heart_Rate_bpm: number;
  Breathing_Rate_breaths_per_min: number;
  Sweating_Level_1_5: number;
  Dizziness: string;
  Medication: string;
  Therapy_Sessions_per_month: number;
  Recent_Major_Life_Event: string;
  Diet_Quality_1_10: number;
}

const occupations = [
  'Artist', 'Athlete', 'Chef', 'Doctor', 'Engineer', 'Freelancer',
  'Lawyer', 'Musician', 'Nurse', 'Scientist', 'Student', 'Teacher', 'Other'
];

const formSteps = [
  {
    title: "Basic Information",
    fields: ["Age", "Gender", "Occupation"]
  },
  {
    title: "Lifestyle Factors",
    fields: ["Sleep_Hours", "coffee_cups", "Physical_Activity_hrs_per_week", "Alcohol_Consumption_drinks_per_week"]
  },
  {
    title: "Health History",
    fields: ["Smoking", "Family_History_of_Anxiety", "Medication", "Therapy_Sessions_per_month"]
  },
  {
    title: "Current State",
    fields: ["Stress_Level_1_10", "Heart_Rate_bpm", "Breathing_Rate_breaths_per_min", "Sweating_Level_1_5"]
  },
  {
    title: "Additional Information",
    fields: ["Dizziness", "Recent_Major_Life_Event", "Diet_Quality_1_10"]
  }
];

export const AssessmentForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    Age: 0,
    Gender: '',
    Occupation: '',
    Sleep_Hours: 0,
    Physical_Activity_hrs_per_week: 0,
    Caffeine_Intake_mg_per_day: 0,
    Alcohol_Consumption_drinks_per_week: 0,
    Smoking: '',
    Family_History_of_Anxiety: '',
    Stress_Level_1_10: 1,
    Heart_Rate_bpm: 80,
    Breathing_Rate_breaths_per_min: 12,
    Sweating_Level_1_5: 1,
    Dizziness: '',
    Medication: '',
    Therapy_Sessions_per_month: 0,
    Recent_Major_Life_Event: '',
    Diet_Quality_1_10: 5
  });

  const [showResults, setShowResults] = useState(false);
  const [coffeeInput, setCoffeeInput] = useState('0');
  const [prediction, setPrediction] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const currentFields = formSteps[currentStep].fields;
    const newErrors: Record<string, string> = {};
    let isValid = true;

    currentFields.forEach(field => {
      if (field === 'coffee_cups') {
        if (!coffeeInput || parseFloat(coffeeInput) < 0) {
          newErrors[field] = 'Please enter a valid number of coffee cups';
          isValid = false;
        }
      } else {
        const value = formData[field as keyof FormData];
        if (value === '' || value === 0) {
          newErrors[field] = 'This field is required';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'coffee_cups') {
      setCoffeeInput(value);
      const caffeineMg = parseFloat(value) * 95;
      setFormData(prev => ({
        ...prev,
        Caffeine_Intake_mg_per_day: caffeineMg
      }));
    } else if ([
      'Age', 'Sleep_Hours', 'Physical_Activity_hrs_per_week', 'Alcohol_Consumption_drinks_per_week',
      'Stress_Level_1_10', 'Heart_Rate_bpm', 'Breathing_Rate_breaths_per_min',
      'Sweating_Level_1_5', 'Therapy_Sessions_per_month', 'Diet_Quality_1_10'
    ].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep()) {
      setShowResults(true);
      console.log("Submitting form data:", formData);
  
      try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) throw new Error("API call failed");
  
        const result = await response.json();
        console.log("Received prediction:", result);
        setPrediction(result.predicted_anxiety_level);
      } catch (error) {
        console.error("Error sending data to backend:", error);
      }
    }
  };

  const nextStep = () => {
    if (validateStep() && currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderFormField = (fieldName: string) => {
    const errorMessage = errors[fieldName];
    const errorClass = errorMessage ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : '';

    switch (fieldName) {
      case "Age":
        return (
          <div className="form-group\" key={fieldName}>
            <label htmlFor="Age">Age</label>
            <input
              type="number"
              id="Age"
              name="Age"
              value={formData.Age}
              onChange={handleInputChange}
              min="0"
              required
              className={`form-input ${errorClass}`}
            />
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Gender":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Gender">Gender</label>
            <select
              id="Gender"
              name="Gender"
              value={formData.Gender}
              onChange={handleInputChange}
              required
              className={`form-select ${errorClass}`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Occupation":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Occupation">Occupation</label>
            <select
              id="Occupation"
              name="Occupation"
              value={formData.Occupation}
              onChange={handleInputChange}
              required
              className={`form-select ${errorClass}`}
            >
              <option value="">Select occupation</option>
              {occupations.map(occupation => (
                <option key={occupation} value={occupation}>{occupation}</option>
              ))}
            </select>
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Sleep_Hours":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Sleep_Hours">Sleep Hours (per day)</label>
            <input
              type="number"
              id="Sleep_Hours"
              name="Sleep_Hours"
              value={formData.Sleep_Hours}
              onChange={handleInputChange}
              min="0"
              max="24"
              step="0.5"
              required
              className={`form-input ${errorClass}`}
            />
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "coffee_cups":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="coffee_cups">
              Coffee Cups per Day
              <span className="text-sm text-secondary-600 ml-1">
                (1 cup ≈ 95mg caffeine)
              </span>
            </label>
            <input
              type="number"
              id="coffee_cups"
              name="coffee_cups"
              value={coffeeInput}
              onChange={handleInputChange}
              min="0"
              step="0.5"
              required
              className={`form-input ${errorClass}`}
            />
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Physical_Activity_hrs_per_week":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Physical_Activity_hrs_per_week">
              Physical Activity (hours/week)
            </label>
            <input
              type="number"
              id="Physical_Activity_hrs_per_week"
              name="Physical_Activity_hrs_per_week"
              value={formData.Physical_Activity_hrs_per_week}
              onChange={handleInputChange}
              min="0"
              step="0.5"
              required
              className={`form-input ${errorClass}`}
            />
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Alcohol_Consumption_drinks_per_week":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Alcohol_Consumption_drinks_per_week">
              Alcohol Consumption (drinks/week)
            </label>
            <input
              type="number"
              id="Alcohol_Consumption_drinks_per_week"
              name="Alcohol_Consumption_drinks_per_week"
              value={formData.Alcohol_Consumption_drinks_per_week}
              onChange={handleInputChange}
              min="0"
              step="1"
              required
              className={`form-input ${errorClass}`}
            />
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Smoking":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Smoking">Do you smoke?</label>
            <select
              id="Smoking"
              name="Smoking"
              value={formData.Smoking}
              onChange={handleInputChange}
              required
              className={`form-select ${errorClass}`}
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Family_History_of_Anxiety":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Family_History_of_Anxiety">
              Family History of Anxiety
            </label>
            <select
              id="Family_History_of_Anxiety"
              name="Family_History_of_Anxiety"
              value={formData.Family_History_of_Anxiety}
              onChange={handleInputChange}
              required
              className={`form-select ${errorClass}`}
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Stress_Level_1_10":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Stress_Level_1_10">
              Stress Level (1-10)
            </label>
            <input
              type="range"
              id="Stress_Level_1_10"
              name="Stress_Level_1_10"
              value={formData.Stress_Level_1_10}
              onChange={handleInputChange}
              min="1"
              max="10"
              required
              className={`form-range ${errorClass}`}
            />
            <div className="text-sm text-secondary-600 mt-1">
              Current value: {formData.Stress_Level_1_10}
            </div>
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Heart_Rate_bpm":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Heart_Rate_bpm">
              Heart Rate (BPM)
              <div className="text-sm text-secondary-600">
                Average is around 80 BPM
              </div>
            </label>
            <select
              id="Heart_Rate_bpm"
              name="Heart_Rate_bpm"
              value={formData.Heart_Rate_bpm}
              onChange={handleInputChange}
              required
              className={`form-select ${errorClass}`}
            >
              <option value="">Select option</option>
              <option value="80">Normal (≈80 BPM)</option>
              <option value="110">High (≈110 BPM)</option>
            </select>
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Breathing_Rate_breaths_per_min":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Breathing_Rate_breaths_per_min">
              Breathing Rate (breaths/min)
              <div className="text-sm text-secondary-600">
                Normal range: 12-20 breaths/min
              </div>
            </label>
            <input
              type="number"
              id="Breathing_Rate_breaths_per_min"
              name="Breathing_Rate_breaths_per_min"
              value={formData.Breathing_Rate_breaths_per_min}
              onChange={handleInputChange}
              min="0"
              required
              className={`form-input ${errorClass}`}
            />
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Sweating_Level_1_5":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Sweating_Level_1_5">
              Sweating Level (1-5)
            </label>
            <input
              type="range"
              id="Sweating_Level_1_5"
              name="Sweating_Level_1_5"
              value={formData.Sweating_Level_1_5}
              onChange={handleInputChange}
              min="1"
              max="5"
              required
              className={`form-range ${errorClass}`}
            />
            <div className="text-sm text-secondary-600 mt-1">
              Current value: {formData.Sweating_Level_1_5}
            </div>
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Dizziness":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Dizziness">Do you often experience dizziness?</label>
            <select
              id="Dizziness"
              name="Dizziness"
              value={formData.Dizziness}
              onChange={handleInputChange}
              required
              className={`form-select ${errorClass}`}
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Medication":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Medication">Are you taking any medication?</label>
            <select
              id="Medication"
              name="Medication"
              value={formData.Medication}
              onChange={handleInputChange}
              required
              className={`form-select ${errorClass}`}
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Therapy_Sessions_per_month":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Therapy_Sessions_per_month">
              Therapy Sessions per Month
            </label>
            <input
              type="number"
              id="Therapy_Sessions_per_month"
              name="Therapy_Sessions_per_month"
              value={formData.Therapy_Sessions_per_month}
              onChange={handleInputChange}
              min="0"
              required
              className={`form-input ${errorClass}`}
            />
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Recent_Major_Life_Event":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Recent_Major_Life_Event">
              Recent Major Life Event?
            </label>
            <select
              id="Recent_Major_Life_Event"
              name="Recent_Major_Life_Event"
              value={formData.Recent_Major_Life_Event}
              onChange={handleInputChange}
              required
              className={`form-select ${errorClass}`}
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      case "Diet_Quality_1_10":
        return (
          <div className="form-group" key={fieldName}>
            <label htmlFor="Diet_Quality_1_10">
              Diet Quality (1-10)
            </label>
            <input
              type="range"
              id="Diet_Quality_1_10"
              name="Diet_Quality_1_10"
              value={formData.Diet_Quality_1_10}
              onChange={handleInputChange}
              min="1"
              max="10"
              required
              className={`form-range ${errorClass}`}
            />
            <div className="text-sm text-secondary-600 mt-1">
              Current value: {formData.Diet_Quality_1_10}
            </div>
            {errorMessage && <div className="text-error-500 text-sm mt-1">{errorMessage}</div>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {!showResults ? (
        <>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {formSteps.map((step, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 mx-1 rounded ${
                    index <= currentStep ? 'bg-primary-600' : 'bg-secondary-200'
                  }`}
                />
              ))}
            </div>
            <h3 className="text-2xl font-bold text-primary-700 mb-2">
              {formSteps[currentStep].title}
            </h3>
            <p className="text-secondary-600">
              Step {currentStep + 1} of {formSteps.length}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formSteps[currentStep].fields.map(field => renderFormField(field))}
              </div>

              {currentStep === formSteps.length - 1 && (
                <div className="bg-primary-50 p-4 rounded-lg flex items-start gap-3">
                  <Info className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                  <div className="text-sm text-primary-800">
                    <p className="font-medium">Privacy Notice</p>
                    <p>All data is processed locally in your browser. We don't store any personal information.</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between gap-4">
                {currentStep > 0 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-secondary flex items-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    Previous
                  </motion.button>
                )}
                
                <motion.button
                  type={currentStep === formSteps.length - 1 ? 'submit' : 'button'}
                  onClick={currentStep === formSteps.length - 1 ? undefined : nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary flex items-center gap-2 ml-auto"
                >
                  {currentStep === formSteps.length - 1 ? (
                    'Get Results'
                  ) : (
                    <>
                      Next
                      <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold mb-4">Assessment Results</h3>

          {prediction !== null && (
            <div className="bg-blue-100 text-blue-900 p-4 rounded-lg mb-4 text-center text-lg font-semibold">
              Predicted Social Anxiety Score: <span className="text-blue-800">{prediction}</span>
            </div>
          )}

          {/* <pre className="bg-secondary-50 p-4 rounded overflow-x-auto">
            {JSON.stringify(formData, null, 2)}
          </pre> */}

          <motion.button
            type="button"
            onClick={() => {
              setShowResults(false);
              setCurrentStep(0);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-secondary mt-4"
          >
            Take Another Assessment
          </motion.button>
        </motion.div>

      )}
    </div>
  );
};