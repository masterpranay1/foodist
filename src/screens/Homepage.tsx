import { Icon } from "@rneui/themed";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import {
  FlatList,
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { RestaurantCard, InputWithIcon, Text } from "../components";
import { POCKETBASE } from "../constants";

interface Restaurant {
  id: string;
  name: string;
  rating: string;
  categories: [string];
}

const AllRestaurantsList = ({
  restaurants,
  fetchRestaurants,
  refreshing,
}: {
  restaurants: Restaurant[];
  fetchRestaurants: () => void;
  refreshing: boolean;
}) => {
  return (
    <React.Fragment>
      {restaurants.length > 0 && (
        <FlatList
          data={restaurants}
          renderItem={({ item }) => <RestaurantCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          refreshControl={
            <RefreshControl
              onRefresh={fetchRestaurants}
              refreshing={refreshing}
            />
          }
          ListHeaderComponent={() => (
            <View className="flex-row items-center mb-4 w-full">
              <View className="border-b border-gray-200 flex-1"></View>
              <Text
                className="mx-4 text-sm tracking-wider text-center uppercase text-slate-400"
                thickness="light"
              >
                All Restaurants
              </Text>
              <View className="border-b border-gray-200 flex-1"></View>
            </View>
          )}
        />
      )}

      {!restaurants.length && !refreshing && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-slate-400 text-lg" thickness="medium">
            No restaurants found
          </Text>
        </View>
      )}
    </React.Fragment>
  );
};

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
        categories: item.categories.split(","),
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <View className="pb-2 px-4 bg-white">
          <View className="flex-row items-center gap-2">
            <Icon name="location-pin" size={32} color="rgba(200, 0, 0, 0.8)" />

            <View>
              <View className="flex-row items-center">
                <Text className="text-base" thickness="extra-bold">
                  Home
                </Text>
                <Icon name="chevron-small-down" size={24} type="entypo" />
              </View>
              <Text className="text-slate-400 text-xs" thickness="medium">
                {address}
              </Text>
            </View>
          </View>

          <View className="rounded-2xl mt-1">
            <InputWithIcon
              iconName="search"
              placeholder="Search for restaurants"
            />
          </View>
        </View>
        {refreshing && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="rgba(200, 0, 0, 0.8)" />
          </View>
        )}

        {!refreshing && (
          <AllRestaurantsList
            restaurants={restaurants}
            fetchRestaurants={fetchRestaurants}
            refreshing={refreshing}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Homepage;
