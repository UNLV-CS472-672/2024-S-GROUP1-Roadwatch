import styles from './SignUp.module.scss';
import * as React from 'react';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function SignUp(): JSX.Element {
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
            <Typography variant="body1" gutterBottom>
                Address
            </Typography>
            <TextField id="outlined-search" label="Enter Address" type="search" />

            <Typography variant="body1" gutterBottom>
                City
            </Typography>
            <TextField id="outlined-search" label="Enter City" type="search" />

            <Typography variant="body1" gutterBottom>
                State
            </Typography>
            <TextField id="outlined-search" label="Enter State" type="search" />

            <Typography variant="body1" gutterBottom>
                Zip Code
            </Typography>
            <TextField id="outlined-search" label="Enter Zip" type="search" />

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
