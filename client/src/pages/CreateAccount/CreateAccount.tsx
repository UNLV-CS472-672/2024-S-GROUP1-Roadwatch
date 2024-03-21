import styles from './CreateAccount.module.scss';
import { useState } from 'react';
import { Button, IconButton, Typography, TextField, AppBar, Toolbar } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';

export default function CreateAccount(): JSX.Element {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

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
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <Button onClick={handleClick} variant="contained" color="primary" fullWidth>
          Create Account
        </Button>
      </div>
    </div>
  );
}
