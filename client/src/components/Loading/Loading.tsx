import styles from './Loading.module.scss';
import logo from '../../assets/Updated_RoadWatch_Logo.svg';

export default function Loading(): JSX.Element {
  return (
    <div className={styles['Loading__container']} data-testid={'Loading'}>
      <img src={logo} alt="Loading indicator displaying the Roadwatch logo." className={styles['Loading__logo']} />
    </div>
  );
}

