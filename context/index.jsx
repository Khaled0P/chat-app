import { useState, createContext } from 'react';

export const Context = createContext();

export const ContextProvider = ({ ...props }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const value = {
    userName,
    setUserName,
    password,
    setPassword,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
