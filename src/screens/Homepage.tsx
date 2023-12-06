import { Icon } from "@rneui/themed";
import { View, Text } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { RestaurantCard, SearchInput } from "../components";

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

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // using ngrok to expose localhost to the internet
        const res = await fetch('https://5e05-2401-4900-1c70-fdc9-9497-83cd-a627-398c.ngrok.io/api/collections/restaurants/records')
        const data = await res.json();
        const restaurants = data.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          rating: item.rating,
        }));
        setRestaurants(restaurants);
      } catch(err) {
        console.error(err);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-row items-center p-2 gap-2">
        <Icon name="location-pin" size={48} color="orange" />
        <Text className="text-md">{address}</Text>
      </View>

      <View className="m-2 rounded-2xl">
        <SearchInput placeholder="Search Restaurant"/>
      </View>

      {restaurants.length > 0 ? (
        <FlatList
          data={restaurants}
          renderItem={({ item }) => <RestaurantCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
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
