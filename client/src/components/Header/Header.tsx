import styles from './Header.module.scss';
import { CustomButton, ProfileIcon } from '@/components';
import notification_icon from 'src/assets/icons/notification-icon.svg';
import help_icon from 'src/assets/icons/help-icon.svg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface HeaderProps {
  userName?: string; // Optional prop
}

export default function Header(props: HeaderProps): JSX.Element {
  const navigate = useNavigate();

  // Destructure the userName prop with a default value
  const { userName = 'Jane Doe' } = props;

  // void function to throw an error
  function throwError(): void {
    // alert the user that the function is not implemented
    alert('Function not implemented.');
    throw new Error('Function not implemented.');
  }

  const handleLogout = () => {
    Cookies.remove('accessToken');
    navigate('/login');
  };

  // Route for help button
  const onClick_helpButton = () => {
    navigate('/instructions');
  };

  return (
    <div className={styles['Header__wrapper']} data-testid={'Header'}>
      <div className={styles['Header__horizontal_container']}>
        {/* Profile Image */}
        <ProfileIcon />

        {/* Welcome message and logout button */}
        <div className={styles['Header__vertical_container']}>
          <p className={styles['Header__heading_text']}>Welcome, {userName}</p>
          <CustomButton onClick={handleLogout}>Logout</CustomButton>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className={styles['Header__horizontal_container']}>
        <div className={styles['Header__quick_action_wrapper']}>
          <div
            className={styles['Header__block']}
            role="button"
            onClick={throwError}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                throwError();
              }
            }} // Adds keyboard interaction
          >
            {/* <CustomButton onClick={throwError} >Help</CustomButton> */}
            <img
              src={notification_icon}
              alt="Notification Icon"
              className={styles['Header__quick_action_button']}
            />
          </div>
          <div
            className={styles['Header__block']}
            role="button"
            onClick={onClick_helpButton}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                throwError();
              }
            }} // Adds keyboard interaction
          >
            <img
              src={help_icon}
              alt="Help Icon"
              className={styles['Header__quick_action_button']}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
