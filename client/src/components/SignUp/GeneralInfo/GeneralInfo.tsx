import styles from './GeneralInfo.module.scss';
import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { TextField, CustomButton, Navbar } from '@/components';

interface GeneralInfoProps {
  updateData: (field: string, value: string) => void;
  handleSubmit: () => void;
}

function GeneralInfo({ updateData, handleSubmit }: GeneralInfoProps): JSX.Element {
  // State variables to store form input values
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [DoB, setDoB] = useState<string>('');

  // Function to handle button click
  const handleClick = () => {
    if (!firstName || !lastName || !userName || !email || !phone || !DoB) {
      alert('Please fill in all required fields.');
      return;
    }

    // Store all form data
    updateData('firstName', firstName);
    updateData('lastName', lastName);
    updateData('userName', userName);
    updateData('email', email);
    updateData('phone', phone);
    updateData('DoB', DoB);
    handleSubmit();
  };

  return (
    <div className={styles['GeneralInfo__Container']}>
      <Box className={styles['GeneralInfo__whiteContainer']} sx={{ width: '75%', maxWidth: 500 }}>
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
        </Stack>
        {/* Custom button for form submission */}
        <CustomButton onClick={handleClick}>Continue</CustomButton>
      </Box>
      <Navbar />
    </div>
  );
}

export default GeneralInfo;
