// ComicDetail.js
import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const ComicDetail = ({ comic, onAddToFavorites }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const ts = Date.now().toString();
      const hash = CryptoJS.MD5(ts + process.env.REACT_APP_MARVEL_PRIVATE_KEY + process.env.REACT_APP_MARVEL_PUBLIC_KEY).toString();
      
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/comics/${comic.id}/characters?ts=${ts}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${hash}`
        );
        const data = await response.json();
        setCharacters(data.data.results);
      } catch (err) {
        setError("No se pudo cargar la información de los personajes.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCharacters();
  }, [comic]);

  if (loading) return <p>Cargando detalles del cómic...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{comic.title}</h2>
      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
      <p>{comic.description || "Sin descripción"}</p>
      <button onClick={() => onAddToFavorites(comic)}>Agregar a Favoritos</button>
      
      <h3>Personajes</h3>
      <ul>
        {characters.map(character => (
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
