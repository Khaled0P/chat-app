import { useState, createContext } from 'react';

export const Context = createContext();

export const ContextProvider = ({ ...props }) => {
  const [userName, setUserName] = useState('');
  const [secrete, setSecrete] = useState('');
  const value = {
    userName,
    setUserName,
    secrete,
    setSecrete,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
