import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Homepage, History, Profile, RestaurantPage } from "../screens";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 2,
          // elevation: 0,
          paddingTop: 10,
          paddingBottom: 10,
          height: 64,
        },
      }}
      sceneContainerStyle={{
        padding: 0,
        backgroundColor: "#fff",
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
      initialRouteName="First"
    >
      <Stack.Screen name="First" component={AppScreens} />
      <Stack.Screen name="RestaurantPage" component={RestaurantPage} />
    </Stack.Navigator>
  );
}

export default function Home() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
