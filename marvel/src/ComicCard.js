import React, { useState } from 'react';

const ComicCard = ({ comic }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div style={styles.card}>
      <img src={comic.image} alt={comic.title} style={styles.image} />
      <h3>{comic.title}</h3>
      <button onClick={toggleFavorite} style={{ ...styles.heartButton, color: isFavorite ? 'red' : 'grey' }}>
        ♥
      </button>
    </div>
  );
};

const styles = {
  card: {
    width: '150px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  heartButton: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  },
};

export default ComicCard;