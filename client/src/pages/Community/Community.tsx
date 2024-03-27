import styles from './Community.module.scss';
import { Navbar } from '@/components';

export default function Community(): JSX.Element {
  return (
    <div className={styles['Community']}>
      <p>Community Page</p>
      <Navbar />
    </div>
  );
}
