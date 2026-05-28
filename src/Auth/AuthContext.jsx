// src/Auth/AuthContext.jsx (updated)
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for token and email on initial load
  useEffect(() => {
    const token = localStorage.getItem('user-auth-token');
    const email = localStorage.getItem('user-email');
    
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
    
    if (email) {
      setUserEmail(email);
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = (token, email = null) => {
    localStorage.setItem('user-auth-token', token);
    setAuthToken(token);
    setIsAuthenticated(true);
    
    if (email) {
      localStorage.setItem('user-email', email);
      setUserEmail(email);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user-auth-token');
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-data');
    setAuthToken(null);
    setUserEmail(null);
    setIsAuthenticated(false);
  };

  // Get user email
  const getUserEmail = () => {
    return userEmail || localStorage.getItem('user-email');
  };

  const value = {
    authToken,
    userEmail,
    isAuthenticated,
    loading,
    login,
    logout,
    getUserEmail, 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;