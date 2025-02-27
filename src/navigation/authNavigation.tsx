import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppRoutes } from "../utils/constants";
import SignupScreen from "../screens/Signup";
export const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppRoutes.signup}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AppRoutes.signup} component={SignupScreen} />
    </Stack.Navigator>
  );
};
export default AuthNavigation;
