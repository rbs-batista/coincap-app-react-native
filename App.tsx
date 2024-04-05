import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider, StatusBar } from 'native-base';
import React, { useEffect } from 'react';
import StorageAdapter from "./src/infrastructure/adapter/storage_adapter";
import { Routes } from './src/routes';

SplashScreen.preventAutoHideAsync();

async function init() { await StorageAdapter.migrate(); }
export default function App() {

  useEffect(() => {
    init();
  }, []);

  setTimeout(async () => {
    await SplashScreen.hideAsync();
  }, 1000);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#131a20" />
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </>
  );
}
