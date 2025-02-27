import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
import { useAuth } from '../context/authContext';
import AuthNavigation from './authNavigation';
import APICallProvider from '../context/apiContext';
import Home from '../screens/home';
import MainNavigation from './mainNavigation';

export const navigationRef = createNavigationContainerRef();
const RootNavigation = () => {
  const {token} = useAuth();
  console.log("token",token)
  return (
    <NavigationContainer ref={navigationRef}>
      {token ? (
       <APICallProvider>
        <MainNavigation/>
       </APICallProvider> 
       
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};
export default RootNavigation;
