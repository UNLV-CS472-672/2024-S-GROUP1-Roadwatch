import styles from './Loading.module.scss';
import logo from '../../assets/Temp_Roadwatch_logo.svg';

export function Loading(): JSX.Element {
  return (
    <div className={styles['Loading__container']}>
      <img src={logo} alt="Loading..." className={styles['Loading__logo']} />
    </div>
  );
}

