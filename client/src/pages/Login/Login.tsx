/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import styles from './Login.module.scss';
import { TextField, Button } from '@mui/material';
import { useLoginMutation } from '@/store';
import { useNavigate } from 'react-router-dom';

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
      <TextField
        label="Username or Email"
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
      />
      <TextField
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
