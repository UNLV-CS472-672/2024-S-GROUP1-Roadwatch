import {Navbar} from '@/components';
import styles from './Home.module.scss';

export default function Home(): JSX.Element {
  return (
    <div className={styles['Home']}>
      <Navbar />
      <h1>Home Page</h1>
    </div>
  );
}
