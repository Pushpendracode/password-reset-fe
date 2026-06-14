import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://password-reset-2-6w12.onrender.com/api/auth';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tokenValid, setTokenValid] = useState(false);

  // Verify token on page load
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`${API_URL}/verify-token/${token}`);
        setTokenValid(true);
      } catch (err) {
        setError('This reset link is invalid or has expired!');
        setTokenValid(false);
      } finally {
        setVerifying(false);
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match!');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters!');
    }
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/reset-password/${token}`, { password });
      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-blue-600 text-xl font-bold">Verifying reset link...</p>
    </div>
  );

  if (!tokenValid) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <span className="text-6xl">❌</span>
        <h2 className="text-2xl font-bold text-red-600 mt-4">Invalid or Expired Link!</h2>
        <p className="text-gray-500 mt-2">{error}</p>
        <a href="/forgot-password" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
          Request New Link
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-6xl">🔒</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">Reset Password</h2>
          <p className="text-gray-500 mt-1">Enter your new password</p>
        </div>

        {error && <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 px-4 py-3 rounded-lg mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;