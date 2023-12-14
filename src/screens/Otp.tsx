import { Icon } from "@rneui/themed";
import { Text } from "../components";
import { ActivityIndicator, View, Pressable } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus, sendOtp, setOtpBufferTime } from "../state/reducers";
import { useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";

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
  const mobileNumber = useSelector((state: any) => state.auth.mobileNumber);
  const otp = useSelector((state: any) => state.auth.otp);
  const otpSendStatus = useSelector((state: any) => state.auth.otpSendStatus);
  const otpBufferTime = useSelector((state: any) => state.auth.otpBufferTime);
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const dispatch = useDispatch();

  const [wrongInput, setWrongInput] = useState(false);
  const [canSendOtp, setCanSendOtp] = useState(false);

  useEffect(() => {
    if (otpBufferTime === 0) {
      setCanSendOtp(true);
      return;
    }

    const timeOut = setTimeout(() => {
      dispatch(setOtpBufferTime(otpBufferTime - 1));
    }, 1000);

    return () => clearTimeout(timeOut)
  }, [otpBufferTime]);

  return (
    <View className="mt-8">
      <Text thickness="medium" className="text-sm text-center">
        We have sent a Verification code to
      </Text>
      <Text thickness="bold" className="text-sm text-center">
        +91-{mobileNumber}
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
          borderColor: wrongInput ? "rgba(200, 0, 0, 0.8)" : "rgba(0,0,0,0.05)",
          borderWidth: 1,
          marginHorizontal: 8,
          fontFamily: "Inter_400Regular",
          color: "rgba(0,0,0,0.8)",
        }}
        onCodeFilled={(code) => {
          if (code === otp) {
            setWrongInput(false);
            dispatch(setLoginStatus("loggedin"));
            dispatch(setOtpBufferTime(0));
          } else {
            setWrongInput(true);
          }
        }}
        autoFocusOnLoad={false}
      />

      {wrongInput && (
        <Text className="text-center text-sm text-red-500 mt-4">
          Wrong OTP. Please try again.
        </Text>
      )}

      {otpSendStatus !== "pending" && (
        <View className="flex-row gap-2 mx-auto text-sm text-slate-400 mt-4">
          <Text className="text-slate-400" thickness="medium">
            Didn't receive SMS?
          </Text>

          {!canSendOtp && (
            <Text className="text-slate-600" thickness="medium">
              Resend SMS in {otpBufferTime}s
            </Text>
          )}

          {canSendOtp && (
            <Pressable
              onPress={() => {
                setCanSendOtp(false);
                dispatchThunk(
                  sendOtp({
                    mobileNumber: mobileNumber,
                    otp: otp,
                  })
                );
              }}
            >
              <Text className="text-slate-600" thickness="medium">
                Resend SMS
              </Text>
            </Pressable>
          )}
        </View>
      )}
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
  const otpSendStatus = useSelector((state: any) => state.auth.otpSendStatus);

  return (
    <View className="py-2 px-4">
      <Header />
      <OtpForm />
      {otpSendStatus == "pending" && <Footer />}
    </View>
  );
};

export default Otp;
