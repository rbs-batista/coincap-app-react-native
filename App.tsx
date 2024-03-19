import React from 'react';
import { Routes } from './src/routes';
import { NativeBaseProvider } from 'native-base';
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components/native";

SplashScreen.preventAutoHideAsync();

export default function App() {

  setTimeout(async () => {
    await SplashScreen.hideAsync();
  }, 3000);

  return (
    <NativeBaseProvider>
      <Routes />
    </NativeBaseProvider>
  );
}
