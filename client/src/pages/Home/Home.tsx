import styles from './Home.module.scss';
import { Navbar } from '@/components';
import { useGetUserQuery, selectLocation } from '@/store';
import { useSelector } from 'react-redux';
import { useLocation } from '@/hooks';

export default function Home(): JSX.Element {
  const { data } = useGetUserQuery();
  console.log(data);

  useLocation();
  const location = useSelector(selectLocation);
  console.log(location);

  return (
    <div className={styles['Home']}>
      <Navbar />
      <h1>Home Page</h1>
      <h1>Logged in as {`${data?.userName}`}</h1>
    </div>
  );
}
