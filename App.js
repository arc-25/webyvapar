import React, { useEffect, useRef } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUp from "./src/screens/SignUp";
import Login from "./src/screens/Login";
import HomeScreen from "./src/screens/HomeScreen";
import SubmitFormScreen from "./src/screens/SubmitFormScreen";
import ShowResultsScreen from "./src/screens/ShowResultsScreen";

const Stack = createNativeStackNavigator();

function App() {
  const navigationRef = useRef(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#2E2C1F",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Submit Form" component={SubmitFormScreen} />
        <Stack.Screen name="Show Results" component={ShowResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
