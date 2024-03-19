import styles from './Home.module.scss';
import { Navbar } from '@/components';
import { useGetUserQuery } from '@/store';

export default function Home(): JSX.Element {
  const { data } = useGetUserQuery();
  console.log(data);

  return (
    <div className={styles['Home']}>
      <Navbar />
      <h1>Home Page</h1>
      <h1>Logged in as {`${data?.userName}`}</h1>
    </div>
  )
}
