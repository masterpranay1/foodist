import { Icon } from "@rneui/themed";
import { View, Text, Pressable } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { RestaurantCard, SearchInput, DishCard } from "../components";
import { useNavigation, useRoute } from "@react-navigation/native";

type DishCardProps = {
  dishTitle: string;
  price: number;
  description: string;
  type: "veg" | "non-veg";
};

const RestaurantPage = () => {
  const [dishes, setDishes] = useState<DishCardProps[]>([]);

  const route = useRoute();
  const { id } = route.params as { id: string };

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        // using ngrok to expose localhost to the internet
        const res = await fetch(
          `https://5e05-2401-4900-1c70-fdc9-9497-83cd-a627-398c.ngrok.io/api/collections/dishes/records?filter=(restaurant='${id}')`
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
      }
    };

    fetchDishes();
  }, []);

  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-row items-center py-4 px-2">
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name="arrow-back"
            size={48}
            color="orange"
          />
        </Pressable>
        <View className="rounded-2xl w-5/6 ml-auto">
          <SearchInput placeholder="Search in Res Name" />
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
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-3xl font-bold">No Dishes</Text>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default RestaurantPage;
