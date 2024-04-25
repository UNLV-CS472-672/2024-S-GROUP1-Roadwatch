import styles from './CreateAccount.module.scss';
import { useState } from 'react';
import { IconButton, Typography, AppBar, Toolbar, Box, Stack } from '@mui/material';
import { Stepper, Step, StepLabel } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { CustomButton, PasswordField } from '@/components';

interface CreateAccountProps {
  currentStep: number;
  steps: string[];
  handleBack: () => void;
  handleSubmit: (password: string) => void;
}

export default function CreateAccount({
  currentStep,
  steps,
  handleBack,
  handleSubmit,
}: CreateAccountProps): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleClick = () => {
    if (!password || !confirmPassword) {
      alert('Please fill in all required fields.');
      return;
    }

    if (password != confirmPassword) {
      alert('Passwords must match!');
      return;
    }

    handleSubmit(password);
  };

  return (
    <div className={styles['CreateAccount__Container']} data-testid={'CreateAccount'}>
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

        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Stack spacing={2}>
          <PasswordField header="Password" setInputValue={setPassword} />
          <PasswordField header="Confirm Password" setInputValue={setConfirmPassword} />
        </Stack>
        <CustomButton onClick={handleClick}>Create Account</CustomButton>
      </Box>
    </div>
  );
}
