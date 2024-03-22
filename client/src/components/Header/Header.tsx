import styles from './Header.module.scss';

interface HeaderProps {
  userName?: string; // Optional prop
}

export default function Header(props: HeaderProps): JSX.Element {
  
  // Destructure the userName prop with a default value
  const { userName = "Jane Doe" } = props; 

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
          <button className={styles['Header__logout_button']}>Logout</button>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className={styles['Header__horizontal_container']}>
        <div className={styles['Header__quick_action_wrapper']}>
          <div className={styles['Header__block']}>
            <button className={styles['Header__quick_action_button']}>Help</button>
          </div>
          <div className={styles['Header__block']}>
            <button className={styles['Header__quick_action_button']}>Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
}
