import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import './Header.css';

export default function Header({ query, setQuery, onSearch, onHomeClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleHomeTap = () => {
    onHomeClick();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="logo" onClick={handleHomeTap} style={{ cursor: 'pointer' }}>
        🎬 MovieApp
      </div>

      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <nav className="nav-links">
        <button onClick={handleHomeTap} className="link-btn">Home</button>
        <Link to="/favorites">Favorites</Link>

        {user ? (
          <div className="user-section">
            <span className="user-email">{user.email}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <Link to="/auth" className="auth-link">Login</Link>
        )}
      </nav>
    </header>
  );
}