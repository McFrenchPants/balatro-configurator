import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [currentDataType, setCurrentDataType] = useState(null);
  const dataTypes = [
    {label:'Jokers', value:'JOKERS'},
    {label:'Tarots', value:'TAROTS'},
    {label:'Planets', value:'PLANETS'},
    {label:'Spectral', value:'SPECTRAL'},
    {label:'Vouchers', value:'VOUCHERS'},
    {label:'Backs', value:'BACKS'},
    {label:'Enhanced Cards', value:'ENHANCED'},
    {label:'Editions', value:'EDITIONS'},
    {label:'Booster Packs', value:'BOOSTERS'}
  ];
  
  const value = {
    isLoading,
    setIsLoading,
    dataTypes,
    data,
    setData,
    currentDataType: currentDataType,
    setCurrentDataType: setCurrentDataType
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}