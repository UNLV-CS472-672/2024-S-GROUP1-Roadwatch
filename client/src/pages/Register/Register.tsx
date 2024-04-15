import styles from './Register.module.scss';
import { GeneralInfo, SignUp, CreateAccount } from '@/components';
import { useState } from 'react';

export default function Register(): JSX.Element {
  const steps = ['General Info', 'Location', 'Create Account'];
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

  const updateFormData = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleCreateAccount = () => {
    // TODO: Create the User
    console.log(formData);
    return 'Account Created';
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <GeneralInfo
            currentStep={currentStep}
            steps={steps}
            updateData={updateFormData}
            handleSubmit={handleNext}
          />
        );
      case 1:
        return (
          <SignUp
            currentStep={currentStep}
            steps={steps}
            updateData={updateFormData}
            handleBack={handleBack}
            handleSubmit={handleNext}
          />
        );
      case 2:
        return (
          <CreateAccount
            currentStep={currentStep}
            steps={steps}
            updateData={updateFormData}
            handleBack={handleBack}
            handleSubmit={handleNext}
          />
        );
      default:
        return;
    }
  };

  return (
    <div className={styles['Register']}>
      {currentStep === steps.length ? (
        <div>{handleCreateAccount()}</div>
      ) : (
        <div>{getStepContent()}</div>
      )}
    </div>
  );
}
