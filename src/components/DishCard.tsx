import React from "react";
import { View } from "react-native";
import Text from "./Text";
import { Icon, Button } from "@rneui/themed";

type DishCardProps = {
  dishTitle: string;
  price: number;
  description: string;
  type: "veg" | "non-veg";
};

const DishCard: React.FC<DishCardProps> = ({
  dishTitle,
  price,
  description,
  type,
}) => {
  return (
    <View className="flex-row py-4 border-b border-dashed border-slate-300">
      <View className="w-2/3 p-4 gap-1">
        <View className="flex items-center flex-row">
          {type === "veg" ? (
            <View className="bg-green-50 rounded-lg border border-green-200 p-1">
              <Icon name="circle" color="green" size={16} />
            </View>
          ) : (
            <View className="bg-red-50 rounded-lg border border-red-200">
              <Icon
                name="triangle-up"
                type="entypo"
                color="rgba(200, 0, 0, 0.8)"
              />
            </View>
          )}
          <Text
            className="ml-2 capitalize text-slate-400 text-xs"
            thickness="medium"
          >
            {type}
          </Text>
        </View>
        <Text className="text-xl capitalize text-slate-800" thickness="bold">
          {dishTitle}
        </Text>
        <Text className="text-md text-slate-600" thickness="bold">
          ₹{price}
        </Text>
        <Text className="text-sm text-gray-400">{description}</Text>
      </View>
      <View className="w-1/3 flex-1">
        <Button
          title="Buy +"
          onPress={() => {
            console.log("Buy button pressed");
          }}
          buttonStyle={{
            marginTop: 32,
            backgroundColor: "#fff6f7",
            marginHorizontal: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#ff4d4f",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 8,

            elevation: 5,
          }}
          containerStyle={{
            flex: 1,
          }}
          titleStyle={{
            color: "#ff4d4f",
            fontWeight: "bold",
            fontSize: 16,
          }}
        />
      </View>
    </View>
  );
};

export default DishCard;
