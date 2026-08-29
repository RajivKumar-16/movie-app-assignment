// import './MovieCard.css';

export default function MovieCard({ movie, onFavorite, isFavorite = false, onRemove }) {
  const placeholder = 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : placeholder}
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year} • {movie.Type}</p>

        {onRemove ? (
          <button className="btn remove-btn" onClick={() => onRemove(movie.imdbID)}>
            Remove
          </button>
        ) : (
          <button className={`btn ${isFavorite ? 'fav-active' : ''}`} onClick={() => onFavorite(movie)}>
            {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
          </button>
        )}
      </div>
    </div>
  );
}