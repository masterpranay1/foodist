import { Icon } from "@rneui/themed";
import { View, Pressable, ActivityIndicator } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { DishCard, InputWithIcon, Text } from "../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { POCKETBASE } from "../constants";

type DishCardProps = {
  dishTitle: string;
  price: number;
  description: string;
  type: "veg" | "non-veg";
};

interface Restaurant {
  id: string;
  name: string;
  rating: string;
  categories: [string];
}

const RestaurantPage = () => {
  const [dishes, setDishes] = useState<DishCardProps[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [refreshing, setRefreshing] = useState(false);

  const route = useRoute();
  const { id } = route.params as { id: string };

  // fetch a single restaurant

  const fetchRestaurant = async () => {
    try {
      setRefreshing(true);
      const res = await fetch(
        `${POCKETBASE}/api/collections/restaurants/records?filter=(id='${id}')`
      );
      const data = await res.json();
      const restaurant: Restaurant = {
        id: data.items[0].id,
        name: data.items[0].name,
        rating: data.items[0].rating,
        categories: data.items[0].categories.split(","),
      };
      setRestaurant(restaurant);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchDishes = async () => {
    try {
      setRefreshing(true);
      const res = await fetch(
        `${POCKETBASE}/api/collections/dishes/records?filter=(restaurant='${id}')`
      );
      const data = await res.json();
      const dishes = data.items.map((record: any) => ({
        dishTitle: record.name,
        price: record.price,
        description: record.description,
        type: record.type,
      }));
      setDishes(dishes);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDishes();
    fetchRestaurant();
  }, []);

  useEffect(() => {
    if (restaurant && restaurant.rating) {
      if (!(restaurant.rating.split(".").length > 1)) {
        setRestaurant({ ...restaurant, rating: restaurant.rating + ".0" });
      }
    }
  }, [restaurant]);

  const navigation = useNavigation();

  return (
    <>
      {(!restaurant || !dishes) && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="rgba(200,0,0, 0.8)" />
        </View>
      )}

      {restaurant && dishes && (
        <View style={{ flex: 1 }}>
          <View className="flex-row items-center pb-2 px-2 border-b border-slate-200">
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon
                name="left"
                size={32}
                color="rgba(200,0,0, 0.8)"
                type="ant-design"
              />
            </Pressable>
            <View className="rounded-2xl w-5/6 mx-auto">
              <InputWithIcon
                iconName="search"
                placeholder="Search for dishes"
              />
            </View>
          </View>

          <View className="flex-col gap-1 items-center justify-center pb-8 my-4 border-b-8 border-slate-200">
            <Text className="text-xl" thickness="bold">
              {restaurant?.name}
            </Text>
            <View className="flex-row items-center">
              {restaurant?.categories.map((category, index) => (
                <React.Fragment key={index}>
                  <Text
                    key={index}
                    className="text-xs text-slate-400"
                    thickness="medium"
                  >
                    {category}
                  </Text>

                  {restaurant?.categories.length > 1 &&
                    index < restaurant?.categories.length - 1 && (
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
            <View className="flex-row items-center pt-2">
              <View className="flex-row items-center p-1 rounded-lg bg-[#24963f]">
                <Text className="text-xs text-white" thickness="bold">
                  {restaurant?.rating}
                </Text>
                <Icon name="star" size={12} color="white" />
              </View>
              <Text className="text-xs ml-4 border-b border-dashed border-slate-200 text-slate-400">
                4.5k ratings
              </Text>
            </View>
          </View>

          {dishes.length > 0 ? (
            <FlatList
              data={dishes}
              renderItem={({ item }) => (
                <DishCard
                  dishTitle={item.dishTitle}
                  price={item.price}
                  description={item.description}
                  type={item.type}
                />
              )}
              keyExtractor={(item) => item.dishTitle}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={fetchDishes}
                />
              }
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-3xl font-bold">No Dishes</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default RestaurantPage;
