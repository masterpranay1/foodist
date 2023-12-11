import { Icon } from "@rneui/themed";
import { View, Text, Pressable } from "react-native";
import { FlatList, GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { RestaurantCard, DishCard, InputWithIcon } from "../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { POCKETBASE } from "../constants";

type DishCardProps = {
  dishTitle: string;
  price: number;
  description: string;
  type: "veg" | "non-veg";
};

const RestaurantPage = () => {
  const [dishes, setDishes] = useState<DishCardProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const route = useRoute();
  const { id } = route.params as { id: string };

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
  }, []);

  const navigation = useNavigation();

  return (
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchDishes} />}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-3xl font-bold">No Dishes</Text>
        </View>
      )}
    </View>
  );
};

export default RestaurantPage;
