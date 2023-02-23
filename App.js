import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
