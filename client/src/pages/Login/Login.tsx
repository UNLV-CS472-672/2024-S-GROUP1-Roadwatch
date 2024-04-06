/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import styles from './Login.module.scss';
import { useLoginMutation } from '@/store';
import { useNavigate } from 'react-router-dom';
import { TextField, PasswordField, CustomButton } from '@/components';
import logo from '../../assets/Updated_RoadWatch_Logo.svg';

export default function Login(): JSX.Element {
  // State management for user input and password
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');

  // Mutation hook for login functionality
  const [login] = useLoginMutation();
  // const [createUser] = useCreateUserMutation();

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
          navigate('/', { replace: true });
        }
      }
    } catch (err) {
      // Log any errors to the console
      console.log(err);
    }
  };

  // Render login form
  return (
    <div className={styles['Login__LoginContainer']}>
      <div className={styles['Login__whiteContainer']} data-testid={'Login-textField'}>
        <div className={styles['Login__logo']} data-testid={'Login-logo'}>
          <img src={logo} alt={'Roadwatch Logo'} />
        </div>
        <TextField header="Username or Email" setInputValue={setUserInput} />
        <PasswordField header="Password" setInputValue={setPassword} />
        <div className={styles['Login__textCentered']} data-testid={'Login-btns'}>
          <CustomButton onClick={handleLogin}>Login</CustomButton>
          <br />
          <br />
          <b>Forgot Password</b>
          <br />
          <br />
          <div className={styles['Login__registerHereContainer']} data-testid={'Login-register'}>
            <p>
              {' '}
              {"Don't have an account? "}
              <a href="/register" className={styles.Login__registerHereBtn}>
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
