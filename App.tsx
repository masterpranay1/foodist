import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./src/state/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Home from "./src/navigation/navigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Provider store={store}>
      <SafeAreaView className="flex-1 mt-12">
          <StatusBar style="auto" />
        <GestureHandlerRootView className="flex-1">
          <Home />
        </GestureHandlerRootView>
      </SafeAreaView>
    </Provider>
  );
}
