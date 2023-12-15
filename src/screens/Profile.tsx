import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Button, Text } from "../components";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setEmail, setLoginStatus, setName } from "../state/reducers";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [changesMade, setChangesMade] = useState(false);

  const status = useSelector((state: any) => state.auth.status);
  const name = useSelector((state: any) => state.auth.name);
  const mobileNumber = useSelector((state: any) => state.auth.mobileNumber);
  const email = useSelector((state: any) => state.auth.email);
  const dispatch = useDispatch();

  useEffect(() => {
    setProfileData({
      ...profileData,
      phone: mobileNumber,
      email: email,
      name: name,
    });
  }, [mobileNumber, email, name]);

  useEffect(() => {
    if (profileData.email !== email || profileData.name !== name) {
      setChangesMade(true);
    }
    if(profileData.email === email && profileData.name === name) {
      setChangesMade(false);
    }
  }, [profileData])

  if (status !== "loggedin") {
    return <SafeAreaView className="h-full w-full">
      <View className="m-auto">
        <Button
          title="Login"
          onPress={() => {
            dispatch(setLoginStatus("login"));
          }}
        />
      </View>
    </SafeAreaView>;
  }

  return (
    <SafeAreaView className="h-full w-full">
      <View className="h-full mx-4">
        <View className="relative my-4">
          <Text className="p-1 bg-white text-slate-400 absolute -top-1/4 left-4 z-10">
            Name
          </Text>
          <TextInput
            placeholder="Enter name"
            className="border-2 border-gray-200 rounded-lg px-4 py-3.5 text-base"
            style={{
              fontFamily: "Inter_500Medium",
            }}
            cursorColor={"rgba(0, 0, 0, .5)"}
            value={profileData.name}
            onChange={(e) => {
              setProfileData({
                ...profileData,
                name: e.nativeEvent.text,
              });
            }}
          />
        </View>

        <View className="relative my-4">
          <Text className="p-1 bg-white text-slate-400 absolute -top-1/4 left-4 z-10">
            Email
          </Text>
          <TextInput
            placeholder="Enter email"
            className="border-2 border-gray-200 rounded-lg px-4 py-3.5 text-base"
            style={{
              fontFamily: "Inter_400Regular",
            }}
            cursorColor={"rgba(0, 0, 0, .5)"}
            value={profileData.email}
            onChange={(e) => {
              setProfileData({
                ...profileData,
                email: e.nativeEvent.text,
              });
            }}
            keyboardType="email-address"
          />
        </View>

        <View className="relative my-4">
          <Text className="p-1 bg-white text-slate-400 absolute -top-1/4 left-4 z-10">
            Phone
          </Text>
          <TextInput
            placeholder="Enter phone"
            className="border-2 border-gray-200 rounded-lg px-4 py-3.5 text-base"
            style={{
              fontFamily: "Inter_400Regular",
            }}
            cursorColor={"rgba(0, 0, 0, .5)"}
            value={profileData.phone}
          />
        </View>

        <View className="my-2">
          <Button
            title="Update"
            onPress={() => {
              if(changesMade) {
                setChangesMade(false);
                dispatch(setEmail(profileData.email));
                dispatch(setName(profileData.name));
              } else {
                return;
              }
            }}
            disabled={!changesMade}
          />
        </View>

        <View className="mt-auto mb-4">
          <Button
            title="Logout"
            onPress={() => {
              dispatch(setLoginStatus("login"));
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
