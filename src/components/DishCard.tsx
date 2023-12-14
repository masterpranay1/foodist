import React from "react";
import { View, Image } from "react-native";
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
    <View className="flex-row py-6 border-b border-dashed border-slate-300">
      <View className="w-3/5 p-4 gap-1">
        <View className="flex items-center flex-row">
          {type === "veg" ? (
            <View className="bg-green-50 rounded-md border border-green-200 p-0.5">
              <Icon name="circle" color="green" size={12} />
            </View>
          ) : (
            <View className="bg-red-50 rounded-md border border-red-200 p-0">
              <Icon
                name="triangle-up"
                type="entypo"
                color="rgba(200, 0, 0, 0.8)"
                size={16}
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
        <Text className="text-base capitalize text-slate-800" thickness="bold">
          {dishTitle}
        </Text>
        <Text className="text-sm text-slate-600" thickness="bold">
          ₹{price}
        </Text>
        <Text className="text-xs text-gray-500">{description}</Text>
      </View>
      <View className="w-2/5 flex-1 px-3">
        <Image
          source={{ uri: `https://picsum.photos/400/400?random=1` }}
          className="rounded-lg aspect-square"
        />
        <Button
          title="Add"
          onPress={() => {
            console.log("Buy button pressed");
          }}
          buttonStyle={{
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
            marginTop: "-15%",
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
