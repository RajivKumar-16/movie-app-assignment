import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomeView from './pages/home/HomeView';
import { useHomeViewModel } from './pages/home/useHomeViewModel';
import FavoritesView from './pages/favorites/FavoritesView';
import AuthView from './pages/auth/AuthView';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}

export default function App() {
  const homeViewModel = useHomeViewModel();

  return (
    <div className="app-layout">
      <Header
        query={homeViewModel.query}
        setQuery={homeViewModel.setQuery}
        onSearch={homeViewModel.handleSearch}
        onHomeClick={homeViewModel.loadInitial}
      />

      <Routes>
        <Route path="/" element={<HomeView viewModel={homeViewModel} />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesView />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthView />} />
      </Routes>
    </div>
  );
}