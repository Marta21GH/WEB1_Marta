import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <img src={`${process.env.PUBLIC_URL}/COMIC3.png`} alt="Comic Kingdom Logo" style={styles.logo} />
      <input type="text" placeholder="Buscar..." style={styles.searchBar} />
      <div style={styles.profile}>Perfil / Iniciar Sesión</div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '50px 20px',
    backgroundColor: '#2d2d2d',
  },
  logo: {
    height: '50px',
  },
  searchBar: {
    flex: 1,
    margin: '0 40px',
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
  },
  profile: {
    color: 'white',
    cursor: 'pointer',
  },
};

export default Header;