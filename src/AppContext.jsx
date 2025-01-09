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
  const fieldTypes = {
    JOKERS: [
      { key: "order", show: false, type: "number" },
      { key: "unlocked", show: true, type: "boolean" },
      { key: "start_alerted", show: true, type: "boolean" },
      { key: "discovered", show: true, type: "boolean" },
      { key: "blueprint_compat", show: true, type: "boolean" },
      { key: "eternal_compat", show: true, type: "boolean" },
      { key: "rarity", show: true, type: "number" },
      { key: "cost", show: true, type: "number" },
      { key: "name", show: true, type: "string" },
      { key: "pos", show: false, type: "object" },
      { key: "set", show: false, type: "string" },
      { key: "effect", show: true, type: "string" },
      { key: "cost_mult", show: true, type: "number" },
      { key: "config", show: true, type: "object" }
    ],
    TAROTS: [
      { key: "order", show: false, type: "number" },
      { key: "consumeable", show: false, type: "boolean" },
      { key: "discovered", show: true, type: "boolean" },
      { key: "set", show: false, type: "string" },
      { key: "effect", show: true, type: "string" },
      { key: "cost", show: true, type: "number" },
      { key: "name", show: true, type: "string" },
      { key: "pos", show: false, type: "object" },
      { key: "cost_mult", show: true, type: "number" },
      { key: "config", show: true, type: "object" },
      { key: "mod_conv", show: true, type: "string" },
      { key: "suit_conv", show: true, type: "string" },
      { key: "max_highlighted", show: true, type: "number" },
      { key: "min_highlighted", show: true, type: "number" }
    ],
    PLANETS: [
      { key: "order", show: false, type: "number" },
      { key: "discovered", show: true, type: "boolean" },
      { key: "cost", show: true, type: "number" },
      { key: "consumeable", show: false, type: "boolean" },
      { key: "name", show: true, type: "string" },
      { key: "pos", show: false, type: "object" },
      { key: "set", show: false, type: "string" },
      { key: "effect", show: true, type: "string" },
      { key: "cost_mult", show: true, type: "number" },
      { key: "config", show: true, type: "object" },
      { key: "hand_type", show: true, type: "string" },
      { key: "softlock", show: true, type: "boolean" }
    ],
    SPECTRAL: [
      { key: "order", show: false, type: "number" },
      { key: "discovered", show: true, type: "boolean" },
      { key: "cost", show: true, type: "number" },
      { key: "consumeable", show: false, type: "boolean" },
      { key: "name", show: true, type: "string" },
      { key: "pos", show: false, type: "object" },
      { key: "set", show: false, type: "string" },
      { key: "effect", show: true, type: "string" },
      { key: "config", show: true, type: "object" },
      { key: "remove_card", show: true, type: "boolean" },
      { key: "extra", show: true, type: "string" }, // Handle dynamic types as needed
      { key: "max_highlighted", show: true, type: "number" },
      { key: "hidden", show: true, type: "boolean" }
    ],
    VOUCHERS: [
      { key: "order", show: false, type: "number" },
      { key: "discovered", show: true, type: "boolean" },
      { key: "unlocked", show: true, type: "boolean" },
      { key: "available", show: true, type: "boolean" },
      { key: "cost", show: true, type: "number" },
      { key: "name", show: true, type: "string" },
      { key: "pos", show: false, type: "string" },
      { key: "set", show: false, type: "string" },
      { key: "requires", show: true, type: "string" },
      { key: "unlock_condition", show: true, type: "object" },
      { key: "type", show: true, type: "string" },
      { key: "extra", show: true, type: "number" },
      { key: "ante", show: true, type: "number" }
    ],
    BACKS: [
      { key: "name", show: true, type: "string" },
      { key: "stake", show: false, type: "number" },
      { key: "unlocked", show: true, type: "boolean" },
      { key: "order", show: false, type: "number" },
      { key: "pos", show: false, type: "string" },
      { key: "set", show: false, type: "string" },
      { key: "config", show: true, type: "object" },
      { key: "unlock_condition", show: true, type: "object" },
      { key: "jokers", show: true, type: "object" },
      { key: "consumables", show: true, type: "object" },
      { key: "vouchers", show: true, type: "object" }
    ],
    ENHANCED: [
      { key: "max", show: false, type: "number" },
      { key: "order", show: false, type: "number" },
      { key: "name", show: true, type: "string" },
      { key: "pos", show: false, type: "object" },
      { key: "set", show: false, type: "string" },
      { key: "effect", show: true, type: "string" },
      { key: "label", show: true, type: "string" },
      { key: "config", show: true, type: "object" },
      { key: "bonus", show: true, type: "number" },
      { key: "mult", show: true, type: "number" },
      { key: "Xmult", show: true, type: "number" },
      { key: "h_x_mult", show: true, type: "number" },
      { key: "extra", show: true, type: "number" },
      { key: "h_dollars", show: true, type: "number" },
      { key: "p_dollars", show: true, type: "number" }
    ],
    EDITIONS: [
      { key: "order", show: false, type: "number" },
      { key: "unlocked", show: true, type: "boolean" },
      { key: "discovered", show: true, type: "boolean" },
      { key: "name", show: true, type: "string" },
      { key: "pos", show: false, type: "object" },
      { key: "atlas", show: false, type: "string" },
      { key: "set", show: false, type: "string" },
      { key: "config", show: true, type: "object" },
      { key: "extra", show: true, type: "number" }
    ],
    BOOSTERS: [
      { key: "order", show: false, type: "number" },
      { key: "discovered", show: true, type: "boolean" },
      { key: "name", show: true, type: "string" },
      { key: "weight", show: true, type: "number" },
      { key: "kind", show: true, type: "string" },
      { key: "cost", show: true, type: "number" },
      { key: "pos", show: false, type: "object" },
      { key: "atlas", show: false, type: "string" },
      { key: "set", show: false, type: "string" },
      { key: "config", show: true, type: "object" },
      { key: "extra", show: true, type: "number" },
      { key: "choose", show: true, type: "number" }
    ]
  };

  const value = {
    isLoading,
    setIsLoading,
    dataTypes,
    fieldTypes,
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