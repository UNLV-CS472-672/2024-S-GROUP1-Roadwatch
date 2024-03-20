import styles from './GeneralInfo.module.scss';
import { useState } from 'react';
import { Button, Box, Stack, Typography } from '@mui/material';
import { TextField } from '@/components';

function GeneralInfo(): JSX.Element {
  console.log('Rendering GeneralInfo...');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [DoB, setDoB] = useState<string>('');

  return (
    <div className={styles['GeneralInfo']}>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h4" gutterBottom align="center">
          General Info
        </Typography>
      </Box>

      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Stack spacing={2}>
          <TextField header="First Name" setInputValue={setFirstName} type="text" />
          <TextField header="Last Name" setInputValue={setLastName} type="text" />
          <TextField header="Username" setInputValue={setUserName} type="text" />
          <TextField header="Email" setInputValue={setEmail} type="email" />
          <TextField header="Phone" setInputValue={setPhone} type="tel" />
          <TextField header="Date of Birth" setInputValue={setDoB} type="date" />

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" size="large" color="success">
              Continue
            </Button>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}

export default GeneralInfo;