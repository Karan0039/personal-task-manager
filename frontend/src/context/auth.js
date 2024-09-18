import React from 'react';
import {createContext} from 'react';
import {useNavigate} from 'react-router-dom';
import LocalStorageService from '../service/localStorage';
export const AuthContext = createContext();
export const AuthProvider = props => {
  const navigate = useNavigate();

  const signin = tokenDetails => {
    LocalStorageService.setTokenDetails(tokenDetails);
    navigate('/');
  };

  const signout = () => {
    LocalStorageService.clear();
    navigate('/');
  };

  const isSignedIn = () => {
    const userDetails = LocalStorageService.getTokenDetails();

    if (userDetails) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signin,
        signout,
        isSignedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
