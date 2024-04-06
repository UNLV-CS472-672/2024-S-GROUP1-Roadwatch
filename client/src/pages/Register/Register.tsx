import styles from './Register.module.scss';
import { GeneralInfo, SignUp, CreateAccount } from '@/components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register(): JSX.Element {
  const navigate = useNavigate();
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

  const handleSubmitGeneralInfo = () => {
    navigate('/register/sign-up');
  };

  const handleBackSignUp = () => {
    navigate('/register');
  };

  const handleSubmitSignUp = () => {
    navigate('/register/create-account');
  };

  const handleBackCreateAccount = () => {
    navigate('/register/sign-up');
  };

  const handleSubmitCreateAccount = () => {
    console.log(formData);
  };

  return (
    <div className={styles['Register']}>
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
