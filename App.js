import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UserScreen from "./components/screens/UserScreen";
import HomeScreen from "./components/screens/HomeScreen";
import MapScreen from "./components/screens/MapScreen";
import CreateReportScreen from "./components/screens/CreateReportScreen";
import { UserProvider } from "./components/contexts/UserContext";
import TabNavigator from "./components/navigators/TabNavigator";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
