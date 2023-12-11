import { Icon } from "@rneui/themed";
import { View, Text } from "react-native";
import {
  FlatList,
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { RestaurantCard, InputWithIcon } from "../components";
import { POCKETBASE } from "../constants";

interface Restaurant {
  id: string;
  name: string;
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

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const fetchRestaurants = async () => {
    try {
      setRefreshing(true);
      const res = await fetch(
        `${POCKETBASE}/api/collections/restaurants/records`
      );
      const data = await res.json();
      const restaurants = data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        rating: item.rating,
      }));
      setRestaurants(restaurants);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="py-2 px-4 shadow-xl shadow-black bg-white">
        <View className="flex-row items-center">
          <Icon name="location-pin" size={32} color="rgba(200, 0, 0, 0.8)" />
          <Text className="text-md ml-2">{address}</Text>
        </View>

        <View className=" rounded-2xl">
          <InputWithIcon
            iconName="search"
            placeholder="Search for restaurants"
          />
        </View>
      </View>
      {restaurants.length > 0 ? (
        <FlatList
          data={restaurants}
          renderItem={({ item }) => <RestaurantCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl onRefresh={fetchRestaurants} refreshing={refreshing} />}
        />
      ) : (
        <Text className="text-center text-2xl font-bold mt-4">
          No restaurants found
        </Text>
      )}
    </GestureHandlerRootView>
  );
};

export default Homepage;
