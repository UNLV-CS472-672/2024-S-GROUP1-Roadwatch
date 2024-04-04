/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import styles from './Login.module.scss';
import { useCreateUserMutation, useLoginMutation, useGetUserQuery } from '@/store';
import { useNavigate } from 'react-router-dom';
import { TextField, PasswordField, CustomButton } from '@/components';
import logo from '../../assets/Updated_RoadWatch_Logo.svg';
import { useLazySendNotificationQuery, useSaveSubscriptionMutation } from '@/store';

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

  const [sendNotification] = useLazySendNotificationQuery();
  const [subscribe] = useSaveSubscriptionMutation();

  const handleNotificationRequest = async () => {
    await Notification.requestPermission().catch((e) => console.error(e));
  };

  const handleNotificationSend = async () => {
    console.log(data?.id);
    await sendNotification({ id: data?.id as string, message: 'Hello Jordan!' });
  };

  const handleNotificationSubscription = async () => {
    if (Notification.permission !== 'granted') return;

    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) return;

    try {
      const applicationServerKey = Buffer.from(
        'BOF8HhjS9CbQ4Qf7SvJ7wehXHUveQ1iNBSkZSYifNIWVVmgadYmye5vy7wmAkFYVpIHnTXhyc5N6myssnwRcono',
        'base64'
      );
      const subscription: PushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true, // Makes user see every notification sent.
        applicationServerKey,
      });
      await subscribe(subscription);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnregisterServiceWorker = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    await registration?.unregister();
  };

  // Render login form
  return (
    <div className={styles['Login__LoginContainer']}>
      <div className={styles['Login__whiteContainer']}>
        <div className={styles['Login__logo']}>
          <img src={logo} alt={'Roadwatch Logo'} />
        </div>
        <TextField header="Username or Email" setInputValue={setUserInput} />
        <PasswordField header="Password" setInputValue={setPassword} />
        <div className={styles['Login__textCentered']}>
          <CustomButton onClick={handleLogin}>Login</CustomButton>
          <br />
          <br />
          <b>Forgot Password</b>
          <br />
          <br />
          <div className={styles['Login__registerHereContainer']}>
            <p>
              {' '}
              {"Don't have an account?"}
              {/* Once 'register page' is completed update to <a> element to create a hyperlink.
                    ex. <a href="/register" className={styles.Login__registerHereBtn}>Register here</a> */}
              <span className={styles['Login__registerHereBtn']}> Register here</span>
            </p>
          </div>
        </div>
      </div>
      <button onClick={handleUnregisterServiceWorker}>Unregister SW</button>
      <button onClick={handleNotificationRequest}>Request Notification Permission</button>
      <button onClick={handleNotificationSubscription}>Subscribe to Notifications</button>
      <button onClick={handleNotificationSend}>Send Notification</button>
    </div>
  );
}
