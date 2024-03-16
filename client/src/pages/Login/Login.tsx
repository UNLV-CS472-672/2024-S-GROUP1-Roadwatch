/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import styles from './Login.module.scss';
import { TextField, Button } from '@mui/material';
import { useLoginMutation } from '@/store';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '@/utils';

export default function Login(): JSX.Element {
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({ userInput, password });
      console.log(getAccessToken());

      if (getAccessToken()) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles['Login']}>
      <p>Login Page</p>
      <TextField
        label="Username or Email"
        value={userInput}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserInput(event.target.value)}
      />
      <TextField
        label="Password"
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
