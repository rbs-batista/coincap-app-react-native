import React from 'react';
import { Routes } from './src/routes';
import { NativeBaseProvider } from 'native-base';
import {SSRProvider} from '@react-aria/ssr'; 
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components/native";
import THEME from "./src/views/theme";

SplashScreen.preventAutoHideAsync();

export default function App() {

  setTimeout(async () => {
    await SplashScreen.hideAsync();
  }, 3000);

  return (
    <SSRProvider>
      <NativeBaseProvider>
      <ThemeProvider theme={THEME}>
        <Routes />
      </ThemeProvider>
      </NativeBaseProvider>
    </SSRProvider>
  );
}
