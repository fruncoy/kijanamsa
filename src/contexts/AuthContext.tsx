import React, { createContext, useContext, useState } from 'react';
import { AuthState, User } from '../types/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthState>(() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    return {
      isAuthenticated: !!savedUser,
      user: savedUser ? JSON.parse(savedUser) : null,
    };
  });

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      if (email === 'admin@km.com' && password === 'admin') {
        const user: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@km.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        };
        
        // Store user data in the appropriate storage based on rememberMe
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('user', JSON.stringify(user));
        
        setAuth({ isAuthenticated: true, user });
        navigate('/projects');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setAuth({ isAuthenticated: false, user: null });
    navigate('/login');
  };

  // ... rest of the code remains the same