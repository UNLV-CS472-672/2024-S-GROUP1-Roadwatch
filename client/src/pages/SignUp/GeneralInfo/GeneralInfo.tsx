import styles from './GeneralInfo.module.scss';
import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { TextField, CustomButton } from '@/components';

function GeneralInfo(): JSX.Element {
  // State variables to store form input values
  const [, setFirstName] = useState<string>('');
  const [, setLastName] = useState<string>('');
  const [, setUserName] = useState<string>('');
  const [, setEmail] = useState<string>('');
  const [, setPhone] = useState<string>('');
  const [, setDoB] = useState<string>('');

  // Function to handle button click
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className={styles['GeneralInfo__Container']}>
      <Box className={styles['GeneralInfo__whiteContainer']} sx={{ width: '75%', maxWidth: 500}}>
        <Typography variant="h4" gutterBottom align="center" sx={{ paddingBottom: '20px' }}>
          General Info
        </Typography>

        <Stack spacing={2}>
          {/* Text fields for user input */}
          <TextField header="First Name" setInputValue={setFirstName} type="text" />
          <TextField header="Last Name" setInputValue={setLastName} type="text" />
          <TextField header="Username" setInputValue={setUserName} type="text" />
          <TextField header="Email" setInputValue={setEmail} type="email" />
          <TextField header="Phone" setInputValue={setPhone} type="tel" />
          <TextField header="Date of Birth" setInputValue={setDoB} type="date" />

          <Box className={styles['GeneralInfo__continueHereContainer']} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            {/* Custom button for form submission */}
            <CustomButton className={styles['GeneralInfo__continueHereBtn']} onClick={handleClick}>
              Continue
            </CustomButton>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}

export default GeneralInfo;