import styles from './CreateAccount.module.scss';
import { useState } from 'react';
import { IconButton, Typography, AppBar, Toolbar, Box, Stack } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { CustomButton, PasswordField } from '@/components';

interface CreateAccountProps {
  updateData: (field: string, value: string) => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

export default function CreateAccount({
  updateData,
  handleBack,
  handleSubmit,
}: CreateAccountProps): JSX.Element {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClick = () => {
    if (!password || !confirmPassword) {
      alert('Please fill in all required fields.');
      return;
    }

    updateData('password', password);
    updateData('confirmPassword', confirmPassword);
    handleSubmit();
  };

  return (
    <div className={styles['CreateAccount__Container']}>
      <Box className={styles['CreateAccount__whiteContainer']} sx={{ width: '75%', maxWidth: 500 }}>
        <AppBar position="static" className={styles['CreateAccount__TopBar']}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBack}>
              <ArrowBackIos />
            </IconButton>
            <Typography
              variant="h4"
              component="div"
              className={styles['CreateAccount__CenteredTypography']}
            >
              Create Account
            </Typography>
          </Toolbar>
        </AppBar>
        <Stack spacing={2}>
          <PasswordField header="Password" setInputValue={setPassword} />
          <PasswordField header="Confirm Password" setInputValue={setConfirmPassword} />
        </Stack>
        <CustomButton onClick={handleClick}>Create Account</CustomButton>
      </Box>
    </div>
  );
}
