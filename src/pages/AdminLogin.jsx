import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/admin';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminLogin(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
          required className="w-full border rounded p-2" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          required className="w-full border rounded p-2" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:bg-orange-700 disabled:opacity-50">
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;