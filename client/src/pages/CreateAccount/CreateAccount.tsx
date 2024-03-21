import styles from './CreateAccount.module.scss';
import { useState } from 'react';
import { IconButton, Typography, AppBar, Toolbar } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { CustomButton, PasswordField } from '@/components';

export default function CreateAccount(): JSX.Element {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClick = () => {
    // TODO: This button should pass in the password and finish creating the user
    // For now, it simply prints the values
    console.log(password);
    console.log(confirmPassword);
  };

  return (
    <div className={styles['Create Account']}>
      <AppBar
        position="static"
        sx={{ background: 'transparent', boxShadow: 'none', color: 'black' }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBackIos />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}
          >
            Create Account
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px' }}>
        <PasswordField header="Password" setInputValue={setPassword} />
        <PasswordField header="Confirm Password" setInputValue={setConfirmPassword} />
        <CustomButton onClick={handleClick}>Create Account</CustomButton>
      </div>
    </div>
  );
}
