import styles from './Header.module.scss';
import { CustomButton } from '@/components';
import notification_icon from 'src/assets/icons/notification-icon.svg';
import help_icon from 'src/assets/icons/help-icon.svg';
import { useNavigate} from "react-router-dom";


interface HeaderProps {
  userName?: string; // Optional prop
}

export default function Header(props: HeaderProps): JSX.Element {
  // Destructure the userName prop with a default value
  const { userName = 'Jane Doe' } = props;

  // void function to throw an error
  function throwError(): void {
    // alert the user that the function is not implemented
    alert('Function not implemented.');
    throw new Error('Function not implemented.');
  }

  // Route for help button 
  const navigateHelp = useNavigate(); 
  const onClick_helpButton =() => { 
    navigateHelp('/instructions');
  }

  return (
    <div className={styles['Header__wrapper']}>
      <div className={styles['Header__horizontal_container']}>
        {/* Profile Image */}
        <img
          className={styles['Header__profile_picture']}
          src="/images/UNLV.png"
          alt="Profile Picture"
        />

        {/* Welcome message and logout button */}
        <div className={styles['Header__vertical_container']}>
          <p className={styles['Header__heading_text']}>Welcome, {userName}</p>
          <CustomButton onClick={throwError}>Logout</CustomButton>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className={styles['Header__horizontal_container']}>
        <div className={styles['Header__quick_action_wrapper']}>
          <div className={styles['Header__block']}
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
          <div className={styles['Header__block']}
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
