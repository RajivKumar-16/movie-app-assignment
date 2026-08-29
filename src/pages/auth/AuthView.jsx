import { useAuthViewModel } from './useAuthViewModel';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
// import './AuthView.css';

export default function AuthView() {
  const viewModel = useAuthViewModel();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="auth-box">
      <h2>{viewModel.isRegister ? 'Create Account' : 'Sign In'}</h2>

      {viewModel.error && <p className="auth-error">{viewModel.error}</p>}

      <form onSubmit={viewModel.handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={viewModel.email}
          onChange={(e) => viewModel.setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={viewModel.password}
          onChange={(e) => viewModel.setPassword(e.target.value)}
        />
        <button type="submit" disabled={viewModel.loading}>
          {viewModel.loading ? 'Processing...' : viewModel.isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      <button
        className="toggle-btn"
        onClick={() => viewModel.setIsRegister(!viewModel.isRegister)}
      >
        {viewModel.isRegister
          ? 'Already have an account? Login'
          : "Don't have an account? Register"}
      </button>
    </div>
  );
}