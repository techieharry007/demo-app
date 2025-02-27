import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { AuthProvider } from "./context/authContext";
import RootNavigation from "./navigation/rootNavigation";

// SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <AuthProvider>
      <RootNavigation/>
    </AuthProvider>
  );
}
