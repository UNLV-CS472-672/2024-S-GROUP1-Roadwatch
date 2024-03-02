import styles from './Loading.module.scss';
import logo from '../../assets/Temp_Roadwatch_logo.svg';

export default function Loading(): JSX.Element {
  return (
    <div className={styles['Loading__container']}>
      <img src={logo} alt="Loading indicator displaying the Roadwatch logo." className={styles['Loading__logo']} />
    </div>
  );
}

