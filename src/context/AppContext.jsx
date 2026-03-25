import React, { createContext, useContext, useState } from 'react';
import { mockUsers } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(mockUsers.admin); // Default to admin for now

  const switchUser = (panel) => {
    if (mockUsers[panel]) {
      setCurrentUser(mockUsers[panel]);
    }
  };

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, switchUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
