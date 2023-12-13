import { Icon } from "@rneui/themed";
import { Text } from "../components";
import { ActivityIndicator, View, Pressable } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center">
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        className="flex-row items-center"
      >
        <Icon
          name="arrowleft"
          color="rgb(71, 81, 105)"
          size={24}
          type="antdesign"
        />
      </Pressable>
      <Text className="text-slate-600 text-xl ml-4" thickness="medium">
        OTP Verification
      </Text>
    </View>
  );
};

const OtpForm = () => {
  return (
    <View className="mt-8">
      <Text thickness="medium" className="text-sm text-center">
        We have sent a Verification code to
      </Text>
      <Text thickness="bold" className="text-sm text-center">
        +91-8709842029
      </Text>

      <OTPInputView
        pinCount={4}
        style={{
          width: "100%",
          height: 128,
          marginVertical: 16,
        }}
        codeInputFieldStyle={{
          width: 64,
          height: 64,
          borderRadius: 10,
          borderColor: "rgba(0,0,0,0.2)",
          borderWidth: 1,
          marginHorizontal: 8,
          fontFamily: "Inter_400Regular",
          color: "rgba(0,0,0,0.8)",
        }}
      />

      <Text className="text-center text-sm text-slate-400 mt-4">
        Didn't receive the code?{" "}
        <Text className="text-slate-600" thickness="medium">
          Resend SMS in 10s
        </Text>
      </Text>
    </View>
  );
};

const Footer = () => {
  return (
    <View className="mt-16">
      <ActivityIndicator color={"rgba(200, 0, 0, 0.8)"} size={48} />
    </View>
  );
};

const Otp = () => {
  return (
    <View className="py-2 px-4">
      <Header />
      <OtpForm />
      <Footer />
    </View>
  );
};

export default Otp;
