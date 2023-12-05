import { Icon } from "@rneui/themed";
import { View, Text } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { RestaurantCard, SearchInput } from "../components";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
}

const Homepage = () => {
  const [address, setAddress] = useState<string>(
    "123 Main Street, City, State 123 Main Street, City, State"
  );

  useEffect(() => {
    if (address.length > 32) {
      setAddress(address.slice(0, 32) + "...");
    }
  }, [address]);

  const restaurants: Restaurant[] = [
    {
      id: "1",
      name: "Restaurant 1",
      cuisine: "Italian",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Restaurant 2",
      cuisine: "Mexican",
      rating: 4.2,
    },
    {
      id: "3",
      name: "Restaurant 3",
      cuisine: "Chinese",
      rating: 4.7,
    },
    {
      id: "4",
      name: "Restaurant 4",
      cuisine: "Italian",
      rating: 4.5,
    },
    {
      id: "5",
      name: "Restaurant 5",
      cuisine: "Mexican",
      rating: 4.2,
    },
    {
      id: "6",
      name: "Restaurant 6",
      cuisine: "Chinese",
      rating: 4.7,
    },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-row items-center p-2 gap-2">
        <Icon name="location-pin" size={48} color="orange" />
        <Text className="text-md">{address}</Text>
      </View>

      <View className="m-2 rounded-2xl">
        <SearchInput />
      </View>

      <FlatList
        data={restaurants}
        renderItem={RestaurantCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 16,
        }}
        className="mt-4"
      />
    </GestureHandlerRootView>
  );
};

export default Homepage;
