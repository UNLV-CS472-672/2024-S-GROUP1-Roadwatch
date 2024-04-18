import styles from './Register.module.scss';
import { GeneralInfo, SignUp, CreateAccount } from '@/components';
import { useCreateUserMutation } from '@/store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User } from '@/types';

export default function Register(): JSX.Element {
  const steps = ['General Info', 'Location', 'Create Account'];
  const [currentStep, setCurrentStep] = useState(0);
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();
  const [, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
  });

  // ai-gen start (ChatGPT-3.5, 0)
  const updateFormData = (field: string, value: string, callback?: (data: User) => void) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [field]: value };
      if (callback) {
        callback(newData);
      }
      return newData;
    });
  };
  // ai-gen end

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // ai-gen start (ChatGPT-3.5, 2)
  const handleCreateAccount = (password: string) => {
    updateFormData('password', password, (updatedData) => {
      createUser(updatedData)
        .then(() => navigate('/'))
        .catch((error) => console.error('rejected', error));
    });
  };
  // ai-gen end

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
            handleBack={handleBack}
            handleSubmit={handleCreateAccount}
          />
        );
      default:
        return;
    }
  };

  return <div className={styles['Register']}>{getStepContent()}</div>;
}
