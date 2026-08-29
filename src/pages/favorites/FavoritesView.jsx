import MovieCard from '../../components/MovieCard';
import { useFavoritesViewModel } from './useFavoritesViewModel';
// import './FavoritesView.css';

export default function FavoritesView() {
  const { favorites, loading, error, handleRemove } = useFavoritesViewModel();

  if (loading) return <div className="favorites-status">Loading your favorites...</div>;
  if (error) return <div className="favorites-status error">{error}</div>;

  return (
    <div className="favorites-container">
      <h2>Your Saved Favorites</h2>

      {favorites.length === 0 ? (
        <p className="empty-msg">No favorite movies saved yet. Go search and add some!</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}