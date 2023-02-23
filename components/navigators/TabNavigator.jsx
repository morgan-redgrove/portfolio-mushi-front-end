import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator } from "./MainStackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator  screenOptions={{
      headerShown: false
    }}>
        <Tab.Screen name="HomeTab" children={()=><MainStackNavigator openFirst={"Home"}/>} options={{unmountOnBlur:true}}/>
        <Tab.Screen name="MapTab" children={()=><MainStackNavigator openFirst={"Map"}/>} options={{unmountOnBlur:true}}/>
        <Tab.Screen name="CreateReportTab" children={()=><MainStackNavigator openFirst={"CreateReport"}/>} options={{unmountOnBlur:true}}/>
        <Tab.Screen name="UserTab" children={()=><MainStackNavigator openFirst={"User"}/>} options={{unmountOnBlur:true}}/>

    </Tab.Navigator> 
  );
};

export default TabNavigator;