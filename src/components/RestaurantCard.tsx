import { View, Image, Pressable } from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import Text from "./Text";
import { useEffect, useState } from "react";
import React from "react";

interface Restaurant {
  id: string;
  name: string;
  rating: string;
  categories: [string];
}

const RestaurantCard = ({ item }: { item: Restaurant }) => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(item.rating);
  useEffect(() => {
    if (!(item.rating.split(".").length > 1)) {
      setRating(item.rating + ".0");
    }
  }, [item.rating]);

  return (
    <View className="bg-white rounded-2xl mb-8 shadow-lg shadow-gray-400">
      <Pressable
        onPress={() => {
          // @ts-ignore
          navigation.navigate("RestaurantPage", { id: item.id });
        }}
      >
        <Image
          source={{ uri: `https://picsum.photos/360/640?random=${item.id}` }}
          className="rounded-t-2xl aspect-video w-full"
        />

        <View className="px-4 pt-2 pb-4 flex-col gap-1">
          <View className="flex-row items-start">
            <Text thickness="bold" className="text-lg w-64">
              {item.name}
            </Text>
            <View className="flex-row items-center mt-2 ml-auto p-1 rounded-lg bg-[#24963f]">
              <Text className="text-xs text-white" thickness="bold">
                {rating}
              </Text>
              <Icon name="star" size={12} color="white" />
            </View>
          </View>

          <View className="flex-row items-center">
            {item.categories.map((category, index) => (
              <React.Fragment key={index}>
                <Text
                  key={index}
                  className="text-xs text-slate-400"
                  thickness="medium"
                >
                  {category}
                </Text>

                {item.categories.length > 1 &&
                  index < item.categories.length - 1 && (
                    <Icon
                      name="dot-single"
                      size={24}
                      color="rgba(0,0,0,0.2)"
                      type="entypo"
                    />
                  )}
              </React.Fragment>
            ))}
          </View>

          <Text className="text-xs text-slate-400" thickness="medium">4 km</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default RestaurantCard;
