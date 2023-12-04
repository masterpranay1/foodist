import { StyleSheet, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import Home from "./src/navigation/navigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView className="flex-1 mt-12">
        <Home />
      </SafeAreaView>
    </>
  );
}
