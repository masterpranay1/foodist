import { View, Pressable } from "react-native";
import { Text, Button } from "../components";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="w-full h-64 bg-red-700 items-center justify-center relative">
      <Icon name="pizza-slice" color="white" size={48} type="font-awesome-5" />
      <Text className="text-white text-2xl mt-4" thickness="bold">
        Foodist
      </Text>
      <Pressable
        className="absolute right-5 top-5"
        onPress={() => {
          // @ts-ignore
          navigation.navigate("Home");
        }}
      >
        <Text className="bg-gray-200 text-slate-400 py-2 px-4 text-xs rounded-full">
          skip
        </Text>
      </Pressable>
    </View>
  );
};

const FormArea = () => {
  const navigation = useNavigation();

  return (
    <View className="mb-4 mx-4">
      <View className="flex-row items-center w-full">
        <View className="border-b border-gray-200 flex-1"></View>
        <Text className="text-base text-slate-400 mx-4" thickness="medium">
          Log in or sign up
        </Text>
        <View className="border-b border-gray-200 flex-1"></View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 16,

          borderRadius: 10,
          borderColor: "rgba(0,0,0,0.05)",
          borderWidth: 1,
          paddingVertical: 8,
          paddingHorizontal: 12,
        }}
        className="shadow shadow-gray-400"
      >
        <Text>+91</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="rgba(0,0,0,0.2)"
          className="px-2 flex-1"
          style={{
            fontFamily: "Inter_400Regular",
          }}
          cursorColor={"rgba(0,0,0,0.2)"}
          keyboardType="numeric"
        />
      </View>

      <Button
        title="Continue"
        onPress={() => {
          // @ts-ignore
          navigation.navigate("Otp");
        }}
      />
    </View>
  );
};

const Footer = () => {
  return (
    <Text className="text-center text-slate-400 m-12 mt-8">
      By logging in or signing up, you agree to our Terms and Conditions and
      Privacy Policy.
    </Text>
  );
};

const Login = () => {
  return (
    <View className="flex-1">
      <Header />
      <Text
        className="my-8 text-center text-xl text-slate-600"
        thickness="extra-bold"
      >
        Your Favourite Food Delivery and Dining App
      </Text>
      <FormArea />
      <Footer />
    </View>
  );
};

export default Login;
