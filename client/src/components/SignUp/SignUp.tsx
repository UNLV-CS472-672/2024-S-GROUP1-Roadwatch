import styles from './SignUp.module.scss';
import { useState } from 'react';

import { AppBar, Toolbar, IconButton, Stack, Box, Typography } from '@mui/material';
import { Stepper, Step, StepLabel } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { TextField, CustomButton } from '@/components';

interface SignUpProps {
  currentStep: number;
  steps: string[];
  updateData: (field: string, value: string) => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

export default function SignUp({
  currentStep,
  steps,
  updateData,
  handleBack,
  handleSubmit,
}: SignUpProps): JSX.Element {
  const [address, setAddressValue] = useState<string>('');
  const [city, setCityValue] = useState<string>('');
  const [state, setStateValue] = useState<string>('');
  const [zip, setZipValue] = useState<string>('');

  const handleClick = () => {
    if (!address || !city || !state || !zip) {
      alert('Please fill in all required fields.');
      return;
    }

    updateData('address', address);
    updateData('city', city);
    updateData('state', state);
    updateData('zip', zip);
    handleSubmit();
  };

  return (
    <div className={styles['SignUp__Container']}>
      {/* for mobile to desktop scaling */}
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      <Box className={styles['SignUp__whiteContainer']} sx={{ width: '75%', maxWidth: 500 }}>
        {/* create the header */}
        <AppBar position="static" className={styles['SignUp__TopBar']}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBack}>
              <ArrowBackIos />
            </IconButton>
            <Typography variant="h4" className={styles['SignUp__CenteredTypography']}>
              Location
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

        {/* create the input fields and the titles for the fields */}
        <Stack spacing={2}>
          <TextField header="Address" setInputValue={setAddressValue} type="address" />
          <TextField header="City" setInputValue={setCityValue} type="city" />
          <TextField header="State" setInputValue={setStateValue} type="state" />
          <TextField header="Zip Code" setInputValue={setZipValue} type="zip" />
        </Stack>
        <CustomButton onClick={handleClick}>Continue</CustomButton>
      </Box>
    </div>
  );
}
