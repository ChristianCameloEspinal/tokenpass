
import React, { createContext, useContext, useState } from 'react';

// Tipo de datos de usuario
type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    dob: string,
    phone: number,
    token: string,
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
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
    setUser(null);
    localStorage.removeItem('user'); // Borrar el usuario en el almacenamiento local si es necesario
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
