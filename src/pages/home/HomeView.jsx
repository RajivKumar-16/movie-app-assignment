import MovieCard from '../../components/MovieCard';
import { addFavoriteMovie } from '../../services/firebaseService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import './HomeView.css';

export default function HomeView({ viewModel }) {
  const { movies, loading, error } = viewModel;
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddFavorite = async (movie) => {
    if (!user) {
      alert('Please log in first to save favorites!');
      navigate('/auth');
      return;
    }

    try {
      await addFavoriteMovie(user.uid, movie);
      alert(`${movie.Title} saved to your favorites!`);
    } catch (err) {
      alert('Could not save favorite: ' + err.message);
    }
  };

  return (
    <main className="home-container">
      {loading && <div className="spinner">Loading movies...</div>}

      {error && <div className="error-banner">{error}</div>}

      {!loading && !error && (
        <div className="movie-grid">
          {movies.map((m) => (
            <MovieCard key={m.imdbID} movie={m} onFavorite={handleAddFavorite} />
          ))}
        </div>
      )}
    </main>
  );
}