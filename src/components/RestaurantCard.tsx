import { View, Text, Image, Pressable } from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

interface Restaurant {
  id: string;
  name: string;
  rating: number;
}

const RestaurantCard = ({ item }: { item: Restaurant }) => {

  const navigation = useNavigation();

  return (
    <View
      className="bg-white rounded-2xl mb-8"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
      }}
    >
      <Pressable
        onPress={() => {
          // @ts-ignore
          navigation.navigate("RestaurantPage", { id: item.id });
        }}
      >
        <Image
          source={{ uri: `https://picsum.photos/200/300?random=${item.id}` }}
          className="rounded-2xl w-full h-64 mb-2"
        />
        <View className="flex-row items-center p-4">
          <Text className="text-2xl font-bold">{item.name}</Text>
          <View className="flex-row items-center ml-auto py-2 px-2 rounded-lg bg-green-500">
            <Text className="text-md text-white">{item.rating}</Text>
            <Icon name="star" size={20} color="white" />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default RestaurantCard;
