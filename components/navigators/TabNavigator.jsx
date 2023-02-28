import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator } from "./MainStackNavigator";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "red",
        tabBarStyle: {
          backgroundColor: "lightseagreen",
        },
      }}
    >
      <Tab.Screen
        name="Homepage"
        children={() => <MainStackNavigator openFirst={"Home"} />}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <Entypo name="home" color={focused ? "red" : "black"} size={34} />
          ),
          // tabBarLabelStyle: { fontSize: 10 },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Maps"
        children={() => <MainStackNavigator openFirst={"Map"} />}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="google-maps"
              size={34}
              color={focused ? "red" : "black"}
            />
          ),
          // tabBarLabelStyle: { fontSize: 10 },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Create Report"
        children={() => <MainStackNavigator openFirst={"CreateReport"} />}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="mushroom"
              size={34}
              color={focused ? "red" : "black"}
            />
          ),
          // tabBarLabelStyle: { fontSize: 10 },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => <MainStackNavigator openFirst={"User"} />}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              color={focused ? "red" : "black"}
              size={34}
            />
          ),
          // tabBarLabelStyle: { fontSize: 10 },
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
