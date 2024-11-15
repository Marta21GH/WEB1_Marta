import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import Header from './components/Header';
import ComicList from './components/ComicList';
import ComicDetail from './components/ComicDetail';
import './App.css';

const App = () => {
  const [comics, setComics] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]); // Estado para los favoritos
  const [showFavorites, setShowFavorites] = useState(false); // Estado para mostrar solo favoritos

  // Cargar favoritos desde LocalStorage al inicio
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Guardar favoritos en LocalStorage cada vez que cambie la lista
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch para obtener los cómics de la API de Marvel
  useEffect(() => {
    const fetchComics = async () => {
      const ts = Date.now().toString();
      const hash = CryptoJS.MD5(
        ts + process.env.REACT_APP_MARVEL_PRIVATE_KEY + process.env.REACT_APP_MARVEL_PUBLIC_KEY
      ).toString();

      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${hash}`
        );
        const data = await response.json();
        setComics(data.data.results);
      } catch (error) {
        console.error("Error al obtener los cómics de Marvel:", error);
        setError("Hubo un problema al cargar los cómics. Intenta de nuevo más tarde.");
      }
    };

    fetchComics();
  }, []);

  // Función para agregar o quitar un cómic de favoritos
  const toggleFavorite = (comic) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === comic.id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== comic.id);
      } else {
        return [...prevFavorites, comic];
      }
    });
  };

  // Función para manejar la búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar la selección de un cómic
  const handleSelectComic = (comic) => {
    setSelectedComic(comic);
  };

  // Función para alternar la vista de favoritos
  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleShowComicsList = () => {
    setShowFavorites(false);
  };

  // Filtrar cómics según el término de búsqueda y el estado de favoritos
  const filteredComics = comics.filter((comic) =>
    comic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedComics = showFavorites ? favorites : filteredComics;

  return (
    <div className="App">
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onShowFavorites={handleShowFavorites}
        onShowComicsList={handleShowComicsList}
      />
      <h1>{showFavorites ? "Favoritos" : "Lista de Cómics"}</h1>
      {error ? (
        <p>{error}</p>
      ) : selectedComic ? (
        <ComicDetail
          comic={selectedComic}
          onBack={() => setSelectedComic(null)}
          isFavorite={favorites.some((fav) => fav.id === selectedComic.id)}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <ComicList
          comics={displayedComics}
          onSelectComic={handleSelectComic}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default App;