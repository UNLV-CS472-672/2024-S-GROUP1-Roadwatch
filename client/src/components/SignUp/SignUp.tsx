import styles from './SignUp.module.scss';
import { useState } from 'react';

import { IconButton, Stack, Box, Typography } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { TextField, CustomButton } from '@/components';

interface SignUpProps {
  updateData: (field: string, value: string) => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

export default function SignUp({ updateData, handleBack, handleSubmit }: SignUpProps): JSX.Element {
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
    <div className={styles['SignUp']}>
      {/* for mobile to desktop scaling */}
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      {/* create the header */}
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Stack direction="row" spacing={1} alignItems={'center'} justifyContent={'space-evenly'}>
          <IconButton aria-label="back" onClick={handleBack}>
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h4" gutterBottom align="center" sx={{ flexGrow: 1 }}>
            Location
          </Typography>
        </Stack>
      </Box>

      {/* create the input fields and the titles for the fields */}
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Stack spacing={2}>
          <TextField header="Address" setInputValue={setAddressValue} type="address" />
          <TextField header="City" setInputValue={setCityValue} type="city" />
          <TextField header="State" setInputValue={setStateValue} type="state" />
          <TextField header="Zip Code" setInputValue={setZipValue} type="zip" />

          {/* Add a continue button 
                color can be changed if need be, default is blue*/}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <CustomButton variant="contained" size="large" color="success" onClick={handleClick}>
              Continue
            </CustomButton>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}
