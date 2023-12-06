import React from "react";
import { View, Text } from "react-native";
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
    <View className="bg-gray-50 p-4 border-b">
      <View className="flex items-center flex-row">
        {type === "veg" ? (
          <Icon name="leaf" type="font-awesome" color="green" />
        ) : (
          <Icon name="circle" type="font-awesome" color="red" />
        )}
        <Text className="ml-2 font-light">{type}</Text>
      </View>
      <Text className="font-bold text-2xl capitalize">{dishTitle}</Text>
      <Text className="text-lg">₹{price}</Text>
      <Text className="text-sm font-extralight text-gray-500">
        {description}
      </Text>

      {/* Add a buy button */}

      <Button
        title="Buy +"
        onPress={() => {
          console.log("Buy button pressed");
        }}
        buttonStyle={{
          marginTop: 32,
          backgroundColor: "#d36b04",
          borderRadius: 8,
          padding: 8,
          width: "40%",
        }}
      />
    </View>
  );
};

export default DishCard;
