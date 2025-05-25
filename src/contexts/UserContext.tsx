
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserType } from '../utils/types';

type User = UserType

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  login: (user: User) => void;
};

// Contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    //console.log("USER | LOGOUT", user);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };


  return (
    <UserContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};
