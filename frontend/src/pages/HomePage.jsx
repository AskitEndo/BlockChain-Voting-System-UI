import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock } from 'lucide-react';
import monitor from '../images/monitor.jpg';

function HomePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check credentials and redirect accordingly
    if (username === 'admin' && password === 'admin') {
      login('admin');
      navigate('/admin');
    } else if (username === 'user' && password === 'user') {
      login('user');
      navigate('/user');
    } else {
      alert('Invalid credentials. Please try again.');
      // Reset form
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-600 via-violet-500 to-emerald-400">
      <div className="flex w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="hidden w-1/2 md:block">
          <img
            src={monitor}
            alt="Monitor"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full p-8 md:w-1/2">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="mt-2 text-sm text-gray-600">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 text-gray-700 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 text-gray-700 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-violet-600 px-4 py-2 text-white transition-colors hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;