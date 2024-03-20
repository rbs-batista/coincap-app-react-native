import React from 'react';
import { Routes } from './src/routes';
import { NativeBaseProvider, StatusBar } from 'native-base';
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {

  setTimeout(async () => {
    await SplashScreen.hideAsync();
  }, 1000);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#131a20"/>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </>
  );
}
