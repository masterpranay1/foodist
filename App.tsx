import { StyleSheet, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./src/state/store";

import Home from "./src/navigation/navigation";

export default function App() {
  return (
    <Provider store={store}>
    {/* // <> */}
      {/* // <StatusBar style="auto" /> */}
      {/* // <SafeAreaView className="flex-1 mt-12"> */}
        <Home />
      {/* // </SafeAreaView> */}
    {/* // </> */}
    </Provider>
  );
}
