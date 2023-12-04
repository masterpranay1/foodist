import { Icon, Input } from "@rneui/themed";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

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

  const renderRestaurantCard = ({ item }: { item: Restaurant }) => (
    <View style={styles.restaurantCard}>
      <Image
        source={{ uri: `https://picsum.photos/200/300?random=${item.id}` }}
        style={styles.restaurantImage}
      />
      <View className="flex-row items-center">
        <Text style={styles.restaurantName}>{item.name}</Text>
        <View style={styles.restaurantRating} className="flex-row items-center gap-1">
          <Text className="text-md">{item.rating}</Text>
          <Icon name="star" size={20} color="orange" />
        </View>
      </View>
      <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-row items-center p-2 gap-2">
        <Icon name="location-pin" size={48} color="orange" />
        <Text className="text-md">{address}</Text>
      </View>

      <View className="m-2 rounded-2xl">
        <Input
          placeholder="Search"
          leftIcon={<Icon name="search" size={32} color="orange" />}
          containerStyle={{
            borderWidth: 2,
            borderColor: "gray",
            borderRadius: 16,
            padding: 8,
          }}
          renderErrorMessage={false}
          inputContainerStyle={{
            borderWidth: 0,
            borderBottomWidth: 0,
            gap: 16,
          }}
          inputMode="search"
          inputStyle={{
            fontSize: 20,
          }}
        />
      </View>

      <FlatList
        data={restaurants}
        renderItem={renderRestaurantCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 16,
        }}
        className="mt-4"
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  restaurantImage: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  restaurantCuisine: {
    fontSize: 16,
    color: "gray",
  },
  restaurantRating: {
    color: "orange",
    marginLeft: "auto",
    flexDirection: "row",
  },
});

export default Homepage;
