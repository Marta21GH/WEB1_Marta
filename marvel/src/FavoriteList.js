import React from 'react';

const FavoriteList = ({ favorites, onRemoveFromFavorites }) => {
  return (
    <div>
      <h2>Favoritos</h2>
      <ul>
        {favorites.map(favComic => (
          <li key={favComic.id}>
            <img src={`${favComic.thumbnail.path}.${favComic.thumbnail.extension}`} alt={favComic.title} />
            <h3>{favComic.title}</h3>
            <button onClick={() => onRemoveFromFavorites(favComic.id)}>Eliminar de Favoritos</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;