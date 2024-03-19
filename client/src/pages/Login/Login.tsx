/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import styles from './Login.module.scss';
import { Button } from '@mui/material';
import { useLoginMutation } from '@/store';
import { useNavigate } from 'react-router-dom';
import { TextField, PasswordField } from '@/components';

export default function Login(): JSX.Element {
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ userInput, password });

      // this is very annoying type guarding
      if ('data' in res) {
        const { user_id } = res.data;
        if (user_id) {
          navigate('/');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles['Login']}>
      <p>Login Page</p>
      <TextField header="Username or Email" setInputValue={setUserInput} />
      <PasswordField header="Password" setInputValue={setPassword} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
