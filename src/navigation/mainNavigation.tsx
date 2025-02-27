import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppRoutes } from "../utils/constants";
import Home from "../screens/home";
import EditTask from "../screens/editTask";
export const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppRoutes.home}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AppRoutes.home} component={Home} />
      <Stack.Screen name={AppRoutes.edit} component={EditTask} />
    </Stack.Navigator>
  );
};
export default MainNavigation;
