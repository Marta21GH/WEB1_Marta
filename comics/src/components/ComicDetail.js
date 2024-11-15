import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const ComicDetail = ({ comic, onBack, isFavorite, onToggleFavorite }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const ts = Date.now().toString();
      const hash = CryptoJS.MD5(
        ts + process.env.REACT_APP_MARVEL_PRIVATE_KEY + process.env.REACT_APP_MARVEL_PUBLIC_KEY
      ).toString();

      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/comics/${comic.id}/characters?ts=${ts}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${hash}`
        );
        const data = await response.json();
        setCharacters(data.data.results);
      } catch (error) {
        console.error("Error al obtener los personajes del cómic:", error);
      }
    };

    fetchCharacters();
  }, [comic]);

  return (
    <div className="comic-detail">
      <button onClick={onBack}>Volver</button>
      <h2>{comic.title}</h2>
      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
      <p>{comic.description || 'Descripción no disponible.'}</p>
      <button onClick={() => onToggleFavorite(comic)}>
        {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
      </button>
      <h3>Personajes:</h3>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <p>{character.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComicDetail;