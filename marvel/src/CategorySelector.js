import React, { useState } from 'react';

const CategorySelector = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div style={styles.container}>
      {['Todos', 'Manga', 'Americano'].map(category => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          style={{
            ...styles.button,
            backgroundColor: selectedCategory === category ? '#ff6347' : 'transparent',
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  button: {
    padding: '10px 20px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    margin: '0 5px',
  },
};

export default CategorySelector;