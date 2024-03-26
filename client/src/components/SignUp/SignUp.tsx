import styles from './SignUp.module.scss';
import { useState } from 'react';

import { IconButton, Typography, AppBar, Toolbar } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { CustomButton, TextField } from '@/components';

interface SignUpProps {
  updateData: (field: string, value: string) => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

export default function SignUp({ updateData, handleBack, handleSubmit }: SignUpProps): JSX.Element {
  {
    /* input values from the text fields, will be used later */
  }
  const [address, setAddressValue] = useState<string>('');
  const [city, setCityValue] = useState<string>('');
  const [state, setStateValue] = useState<string>('');
  const [zip, setZipValue] = useState<string>('');

  return (
    <div className={styles['SignUp']}>
      {/* for mobile to desktop scaling */}
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      {/* create the header */}
      <AppBar position="static" className={styles['SignUp__TopBar']}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBack}>
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h4" component="div" className={styles['SignUp__CenteredTypography']}>
            Location
          </Typography>
        </Toolbar>
      </AppBar>

      {/* create the input fields and the titles for the fields */}
      <div className={styles['SignUp__PaddedDiv']}>
        <TextField header="Address" setInputValue={setAddressValue} type="address" />
        <TextField header="City" setInputValue={setCityValue} type="city" />
        <TextField header="State" setInputValue={setStateValue} type="state" />
        <TextField header="Zip Code" setInputValue={setZipValue} type="zip" />
        <CustomButton
          onClick={() => {
            updateData('address', address);
            updateData('city', city);
            updateData('state', state);
            updateData('zip', zip);
            handleSubmit();
          }}
        >
          Continue
        </CustomButton>
      </div>
    </div>
  );
}
