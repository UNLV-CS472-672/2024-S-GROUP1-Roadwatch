import styles from './CreateAccount.module.scss';
import { useState } from 'react';
import { IconButton, Typography, AppBar, Toolbar } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { CustomButton, PasswordField } from '@/components';
// import { styled } from '@mui/system';
//
// const TopBar = styled(AppBar)();

export default function CreateAccount({ updateData, handleBack, handleSubmit }): JSX.Element {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className={styles['CreateAccount']}>
      <AppBar position="static" className={styles['CreateAccount__TopBar']}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBack}>
            <ArrowBackIos />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            className={styles['CreateAccount__CenteredTypography']}
          >
            Create Account
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={styles['CreateAccount__PaddedDiv']}>
        <PasswordField header="Password" setInputValue={setPassword} />
        <PasswordField header="Confirm Password" setInputValue={setConfirmPassword} />
        <CustomButton
          onClick={() => {
            updateData('password', password);
            updateData('confirmPassword', confirmPassword);
            handleSubmit();
          }}
        >
          Create Account
        </CustomButton>
      </div>
    </div>
  );
}
