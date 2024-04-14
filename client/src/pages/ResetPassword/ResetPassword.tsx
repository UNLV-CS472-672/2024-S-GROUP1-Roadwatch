import styles from './ResetPassword.module.scss';
import { CustomButton, PasswordField } from '@/components';
import { useState } from 'react';
import logo from '../../assets/Updated_RoadWatch_Logo.svg';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handlePasswordReset = () => {
    console.log('handling reset');
  };

  return (
    <div className={styles['page_container']}>
      <div className={styles['logo_container']}>
        <img src={logo} alt={'Roadwatch Logo'} />
      </div>
      <div className={styles['field_container']}>
        <PasswordField header="New Password" setInputValue={setNewPassword} />
        <PasswordField header="Verify Password" setInputValue={setVerifyPassword} />
        <CustomButton onClick={handlePasswordReset}>Reset Password</CustomButton>
      </div>
    </div>
  );
}
