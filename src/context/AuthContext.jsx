import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Sample credentials for each role
const SAMPLE_CREDENTIALS = {
  customer: {
    email: 'customer@example.com',
    password: 'customer123'
  },
  agent: {
    email: 'agent@example.com',
    password: 'agent123'
  },
  driver: {
    email: 'driver@example.com',
    password: 'driver123'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const login = (email, password) => {
    // Check against sample credentials
    for (const [userRole, credentials] of Object.entries(SAMPLE_CREDENTIALS)) {
      if (email === credentials.email && password === credentials.password) {
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          role: userRole,
          name: userRole.charAt(0).toUpperCase() + userRole.slice(1),
          loginTime: new Date()
        };
        setUser(userData);
        setRole(userRole);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', userRole);
        return { success: true, role: userRole, user: userData };
      }
    }
    return { success: false, error: 'Invalid email or password. Try sample credentials.' };
  };

  const register = (email, password, role) => {
    // Register with sample role-based account
    if (!role) {
      return { success: false, error: 'Please select a role' };
    }

    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: role.charAt(0).toUpperCase() + role.slice(1),
      registeredTime: new Date()
    };

    setUser(userData);
    setRole(role);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('role', role);
    
    return { success: true, role, user: userData };
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  const value = {
    user,
    role,
    login,
    register,
    logout,
    sampleCredentials: SAMPLE_CREDENTIALS
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
