import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getCurrentUser } from '../lib/appwrite';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [adminSession, setAdminSession] = useState(null);
  const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(false)

  const [userLogged, setSetUserLogged] = useState(false)
  const [userLogin, setUserLogin] = useState(null)

  // Admin
  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('adminSession');
        if (sessionData) {
          setAdminSession(JSON.parse(sessionData));
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        console.error('Failed to load session:', error);
      }
    };

    loadSession();
  }, []);

  const signIn = async (username, password) => {
    // Your signInAdmin function
    try {
      const result = await signInAdmin(username, password);
      await AsyncStorage.setItem('adminSession', JSON.stringify(result));
      setAdminSession(result);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('adminSession');
      setAdminSession(null);
      setIsLogged(false);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  // User
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setSetUserLogged(true)
          setUserLogin(res)
        } else {
          setSetUserLogged(false)
          setUserLogin(null)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
    <AuthContext.Provider value={{ adminSession, signIn, signOut, isLogged, userLogged, setSetUserLogged, setUserLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
