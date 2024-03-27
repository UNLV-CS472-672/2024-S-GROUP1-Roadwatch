import styles from './GeneralInfo.module.scss';
import { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { CustomButton, TextField } from '@/components';

interface GeneralInfoProps {
  updateData: (field: string, value: string) => void;
  handleSubmit: () => void;
}

function GeneralInfo({ updateData, handleSubmit }: GeneralInfoProps): JSX.Element {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [DoB, setDoB] = useState<string>('');

  const handleClick = () => {
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
    <div className={styles['GeneralInfo']}>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <AppBar position="static" className={styles['GeneralInfo__TopBar']}>
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            className={styles['GeneralInfo__CenteredTypography']}
          >
            General Info
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={styles['GeneralInfo__PaddedDiv']}>
        <TextField header="First Name" setInputValue={setFirstName} type="text" />
        <TextField header="Last Name" setInputValue={setLastName} type="text" />
        <TextField header="Username" setInputValue={setUserName} type="text" />
        <TextField header="Email" setInputValue={setEmail} type="email" />
        <TextField header="Phone" setInputValue={setPhone} type="tel" />
        <TextField header="Date of Birth" setInputValue={setDoB} type="date" />
        <CustomButton onClick={handleClick}>Continue</CustomButton>
      </div>
    </div>
  );
}

export default GeneralInfo;
