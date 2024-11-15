// ComicList.js
import React from 'react';
import ComicCard from './ComicCard';

const ComicList = ({ comics }) => {
  return (
    <div style={styles.grid}>
      {comics.map(comic => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
    padding: '20px',
  },
};

export default ComicList;