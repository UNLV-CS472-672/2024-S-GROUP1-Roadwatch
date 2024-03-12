import styles from './Navbar.module.scss';

export default function Navbar(): JSX.Element {
  return (
    <div className={styles['Navbar__container']}>
      <button className={styles['Navbar__button']}>Do Something</button>
    </div>
  );
}
