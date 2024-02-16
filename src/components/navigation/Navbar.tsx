const styles = {
  navContainer: {
    display: 'flex',
    width: '100%',
    height: '100px',
    backgroundColor: '#4f4f4f',
    alignItems: 'center',
    padding: '10px',
  },
  button: {
    width: '120px',
    height: '70%',
  },
};

export const Navbar = () => {
  return (
    <div style={styles.navContainer}>
      <button style={styles.button}>Do Something</button>
    </div>
  );
};
