import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Icon } from "@rneui/themed";

export const Input = () => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Enter text"
      placeholderTextColor="rgba(0,0,0,0.2)"
      cursorColor={"rgba(0,0,0,0.2)"}
    />
  );
};

export const InputWithIcon = ({ iconName }: { iconName: string }) => {
  return (
    <View style={styles.inputView}>
      <View style={styles.inputIcon}>
        <Icon
          name={iconName}
          iconStyle={{
            fontSize: 32,
            width: 32,
            height: 32,
            color: "rgba(0,0,0,0.2)",
          }}
        />
      </View>
      <TextInput
        style={styles.inputIconInput}
        placeholder="Enter text"
        placeholderTextColor="rgba(0,0,0,0.2)"
        cursorColor={"rgba(0,0,0,0.2)"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    color: "#222",
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    flexGrow: 1,

    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,

    borderRadius: 10,
    // borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  inputIconInput: {
    backgroundColor: "white",
    color: "#222",
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexGrow: 1,

    borderRadius: 5,
  },
  inputView: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    color: "#222",
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    marginVertical: 8,

    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,

    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.05)",
  },
  inputIcon: {
    color: "rgba(0,0,0,0.2)",
    borderRadius: 5,
    height: "auto",
    paddingLeft: 12,
  },
});
