import React, { useState } from 'react';
import logo from '../assets/COMIC3.png';

const Header = ({ searchTerm, onSearchChange, onShowFavorites, onShowComicsList }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <img src={logo} alt="Comic Kingdom Logo" className="logo" />
      <input
        type="text"
        placeholder="Buscar cómics..."
        value={searchTerm} 
        onChange={onSearchChange} 
        className="search-bar"
      />
      <button className="menu-button" onClick={toggleMenu}>
        {isMenuOpen ? 'X' : '☰'}
      </button>
      {isMenuOpen && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={() => { toggleMenu(); onShowFavorites(); }}>
              Favoritos
            </li>
            <li onClick={() => { toggleMenu(); onShowComicsList(); }}> 
              Lista de Cómics
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;