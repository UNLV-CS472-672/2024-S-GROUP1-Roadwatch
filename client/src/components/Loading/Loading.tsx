import styles from './Loading.module.scss';
import logo from '../../assets/Updated_RoadWatch_Logo.svg';

/**
 * Loading Component
 * 
 * Represents a loading indicator displaying the Roadwatch logo.
 * This component is used to visually indicate that content is being loaded or processed.
 */
export default function Loading(): JSX.Element {
  return (
    <div className={styles['Loading__container']}>
      {/* Roadwatch Logo */}
      <img
        src={logo} // Image source
        alt="Loading indicator displaying the Roadwatch logo." // Alternate text for accessibility
        className={styles['Loading__logo']}
      />
    </div>
  );
}

