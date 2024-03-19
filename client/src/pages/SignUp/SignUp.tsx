import styles from './SignUp.module.scss';
import * as React from 'react';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@/components/TextField/TextField'
//import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function SignUp(): JSX.Element {
  {/* input values from the text fields, will be used later */}
  const [address, setAddressValue] = React.useState<string>('');
  const [city, setCityValue] = React.useState<string>('');
  const [state, setStateValue] = React.useState<string>('');
  const [zip, setZipValue] = React.useState<string>('');

  return ( 
    <div className={styles['SignUp']}> 

    {/* for mobile to desktop scaling */}
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    
      {/* create the header */}
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"space-evenly"}>
          <IconButton aria-label='back'>
            <ArrowBackIosIcon/>
          </IconButton>
          <Typography variant="h4" gutterBottom align="center" sx={{ flexGrow: 1}}>
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
              <Button variant="contained" size="large" color="success">
                Continue
              </Button>
            </Box>
        </Stack>
      </Box>
    </div>
  ); 
}
