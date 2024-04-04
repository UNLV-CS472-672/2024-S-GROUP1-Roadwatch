import styles from './Register.module.scss';
import { GeneralInfo, SignUp, CreateAccount } from '@/components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Stepper, Step, StepLabel } from '@mui/material';
import { useState } from 'react';

const steps = ['General Info', 'Location', 'Create Account'];

export default function Register(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phone: '',
    DoB: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const updateFormData = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmitGeneralInfo = () => {
    navigate('/register/sign-up');
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBackSignUp = () => {
    navigate('/register');
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmitSignUp = () => {
    navigate('/register/create-account');
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBackCreateAccount = () => {
    navigate('/register/sign-up');
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmitCreateAccount = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    console.log(formData);
  };

  return (
    <div className={styles['Register']}>
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Routes>
        <Route
          path="/"
          element={
            <GeneralInfo updateData={updateFormData} handleSubmit={handleSubmitGeneralInfo} />
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignUp
              updateData={updateFormData}
              handleBack={handleBackSignUp}
              handleSubmit={handleSubmitSignUp}
            />
          }
        />
        <Route
          path="/create-account"
          element={
            <CreateAccount
              updateData={updateFormData}
              handleBack={handleBackCreateAccount}
              handleSubmit={handleSubmitCreateAccount}
            />
          }
        />
      </Routes>
    </div>
  );
}
