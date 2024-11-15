import React, { useState } from 'react';
const fallbackImage = `${process.env.PUBLIC_URL}/fallback.png`;

const ComicList = ({ comics, onSelectComic, favorites, onToggleFavorite }) => {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (comicId) => {
    setLoadedImages((prev) => ({ ...prev, [comicId]: true }));
  };

  const handleImageError = (e, comicId) => {
    e.target.src = fallbackImage;
    setLoadedImages((prev) => ({ ...prev, [comicId]: true }));
  };

  return (
    <div className="comic-list">
      {comics.map((comic) => {
        const isFavorite = favorites.some((fav) => fav.id === comic.id);

        return (
          <div key={comic.id} className="comic-card" onClick={() => onSelectComic(comic)}>
            {!loadedImages[comic.id] && <div className="loader">Cargando...</div>}
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              onLoad={() => handleImageLoad(comic.id)}
              onError={(e) => handleImageError(e, comic.id)}
              style={{ display: loadedImages[comic.id] ? 'block' : 'none' }}
            />
            <h3>{comic.title}</h3>
            <button
              className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(comic); }}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ComicList;