import styles from './Chat.module.scss';
import { Navbar } from '@/components';

export default function Chat(): JSX.Element {
  return (
    <div className={styles['Chat']}>
      <p>Chat Page</p>
      <Navbar />
    </div>
  );
}
