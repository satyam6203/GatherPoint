// useAuth hook - Authentication state management
import { useState, useEffect } from 'react';
import AuthService from '../services/authService';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setToken(localStorage.getItem('token'));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      const userData = await AuthService.login(email, password, role);
      AuthService.setUser(userData);
      setUser(userData);
      setToken(userData.token);
      setError(null);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      setLoading(true);
      const userData = await AuthService.signup(name, email, password, role);
      AuthService.setUser(userData);
      setUser(userData);
      setToken(userData.token);
      setError(null);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setToken(null);
    setError(null);
  };

  const refreshToken = async () => {
    try {
      await AuthService.refreshToken();
      setToken(localStorage.getItem('token'));
      // Refresh user data
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      logout();
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    token,
    loading,
    error,
    login,
    signup,
    logout,
    refreshToken,
    getToken: () => localStorage.getItem('token'),
    isAuthenticated: !!user,
    isLoading: loading,
  };
}