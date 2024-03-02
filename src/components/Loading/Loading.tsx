import { useState, useEffect } from 'react'
import styles from './Loading.module.scss';
import logo from '../../assets/Temp_Roadwatch_logo.svg';
// import logo2 from '../../assets/Temp_Roadwatch_logo-2.svg'

export function Loading(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles['Loading__container']}>
      {isLoading && (
        <img src={logo} alt="Loading..." className={styles['Loading__logo']} />
      )}
    </div>
  );
}

