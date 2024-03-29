import styles from './SignUp.module.scss';
import { useState } from 'react';

import { IconButton, Stack, Box, Typography } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { TextField, CustomButton } from '@/components';
//import TextField from '@mui/material/TextField';

export default function SignUp(): JSX.Element {
  {
    /* input values from the text fields, will be used later */
  }
  const [address, setAddressValue] = useState<string>('');
  const [city, setCityValue] = useState<string>('');
  const [state, setStateValue] = useState<string>('');
  const [zip, setZipValue] = useState<string>('');

  console.log(address, city, state, zip);

  const handleClick = () => {
    if (!address || !city || !state || !zip) {
      alert('Please fill in all required fields.');
      return;
    }

    // TODO: Continue to the next page
    console.log(address, city, state, zip);
  };

  return (
    <div className={styles['SignUp']}>
      {/* for mobile to desktop scaling */}
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      {/* create the header */}
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Stack direction="row" spacing={1} alignItems={'center'} justifyContent={'space-evenly'}>
          <IconButton aria-label="back">
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
            <CustomButton
              variant="contained"
              size="large"
              color="success"
              onClick={handleClick}
            >
              Continue
            </CustomButton>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}
