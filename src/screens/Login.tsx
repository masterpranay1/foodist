import { View, Pressable } from "react-native";
import { Text, Button } from "../components";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginmobileNumber,
  setLoginStatus,
  setLoginOtp,
  sendOtp,
  setOtpBufferTime,
} from "../state/reducers";
import { ThunkDispatch } from "redux-thunk";

const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View className="w-full h-64 bg-red-700 items-center justify-center relative">
      <Icon name="pizza-slice" color="white" size={48} type="font-awesome-5" />
      <Text className="text-white text-2xl mt-4" thickness="bold">
        Foodist
      </Text>
      <Pressable
        className="absolute right-5 top-5"
        onPress={() => {
          dispatch(setLoginStatus("skip"));
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
  const dispatch = useDispatch();
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const [mobileNumber, setMobileNumber] = useState(
    useSelector((state: any) => state.auth.mobileNumber)
  );
  const otpSendStatus = useSelector((state: any) => state.auth.otpSendStatus);
  const otpBufferTime = useSelector((state: any) => state.auth.otpBufferTime);

  const [routeToOtp, setRouteToOtp] = useState(false);

  useEffect(() => {
    if (!routeToOtp) {
      return;
    }

    if (otpSendStatus === "success") {
      setRouteToOtp(false);
      // @ts-ignore
      navigation.navigate("Otp");
    } else if(otpSendStatus === "reject") {
      setRouteToOtp(false);
    }
  }, [otpSendStatus]);

  useEffect(() => {
    if(otpBufferTime === 0) {
      return;
    } 

    const timeOut = setTimeout(() => {
      dispatch(setOtpBufferTime(otpBufferTime - 1));
    }, 1000)

    return () => clearInterval(timeOut)

  }, [otpBufferTime])

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
          placeholder="Enter your mobile number"
          placeholderTextColor="rgba(0,0,0,0.2)"
          className="px-2 flex-1"
          style={{
            fontFamily: "Inter_400Regular",
          }}
          cursorColor={"rgba(0,0,0,0.2)"}
          keyboardType="numeric"
          value={mobileNumber}
          onChange={(e) => {
            setMobileNumber(e.nativeEvent.text);
          }}
        />
      </View>

      <Button
        title="Continue"
        onPress={async () => {
          if (mobileNumber.length !== 10) {
            return;
          }
          if (routeToOtp === true || otpSendStatus === "pending") {
            return;
          }

          if(otpBufferTime > 0) {
            return;
          }

          // TODO : Create a service to send OTP
          dispatchThunk(
            sendOtp({
              mobileNumber: mobileNumber,
              otp: "1234",
            })
          );

          setRouteToOtp(true);
        }}
        loading={routeToOtp === true && otpSendStatus === "pending"}
      />
    </View>
  );
};

const Footer = () => {
  return (
    <Text className="text-center text-slate-600 m-12 mt-8">
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
