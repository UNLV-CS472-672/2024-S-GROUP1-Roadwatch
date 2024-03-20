/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import styles from './Login.module.scss';
import { Button } from '@mui/material';
import { useLoginMutation } from '@/store';
import { useNavigate } from 'react-router-dom';
import { TextField, PasswordField } from '@/components';
import logo from '../../assets/Updated_RoadWatch_Logo.svg'; 

export default function Login(): JSX.Element {
   // State management for user input and password
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');

  // Mutation hook for login functionality
  const [login] = useLoginMutation();

  // Navigation hook for redirecting users
  const navigate = useNavigate();

  // Function to handle login process
  const handleLogin = async () => {
    try {
      // Attempt login
      const res = await login({ userInput, password });

      // If response contains data, extract user ID and navigate to home page
      // this is very annoying type guarding
      if ('data' in res) {
        const { user_id } = res.data;
        if (user_id) {
          navigate('/');
        }
      }
    } catch (err) {

      // Log any errors to the console
      console.log(err);
    }
  };

  // Render login form
  return (
    <div><p>Login Page</p>
      <div className={styles['Login__LoginContainer']}>
        <div className={styles['Login__whiteContainer']}>
          <div className={styles['Login__logo']}> <img src = {logo} alt = {"Roadwatch Logo"}/></div>
          <TextField header="Username or Email" setInputValue={setUserInput} />
          <PasswordField header="Password" setInputValue={setPassword} />
          <div className={styles['Login__textCentered']}>
            <Button onClick={handleLogin}>Login</Button>
            <br /><br />
            <b>Forgot Password</b>
            <br /><br />
            <div className={styles['Login__registerHereContainer']}>
                <p> {"Don't have an account?"}
                {/* Once 'register page' is completed update to <a> element to create a hyperlink.
                    ex. <a href="/register" className={styles.Login__registerHereBtn}>Register here</a> */}
                <span className={styles['Login__registerHereBtn']}> Register here</span></p> 
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
