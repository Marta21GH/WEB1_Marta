// App.js
import React, { useState } from 'react';
import Header from './Header';
import CategorySelector from './CategorySelector';
import ComicList from './ComicList';

const App = () => {
  const [category, setCategory] = useState('Todos');
  const [comics, setComics] = useState([
    // Aquí puedes añadir algunos cómics de ejemplo
    { id: 1, title: 'Comic 1', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Comic 2', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Comic 3', image: 'https://via.placeholder.com/150' },
  ]);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    // Lógica para filtrar cómics según la categoría
  };

  return (
    <div>
      <Header />
      <CategorySelector onSelectCategory={handleCategoryChange} />
      <ComicList comics={comics} />
    </div>
  );
};

export default App;
