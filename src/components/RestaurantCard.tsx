import { View, Image, Pressable } from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import Text from "./Text"

interface Restaurant {
  id: string;
  name: string;
  rating: number;
}

const RestaurantCard = ({ item }: { item: Restaurant }) => {

  const navigation = useNavigation();

  return (
    <View
      className="bg-white rounded-2xl mb-8 shadow-md shadow-gray-400"
    >
      <Pressable
        onPress={() => {
          // @ts-ignore
          navigation.navigate("RestaurantPage", { id: item.id });
        }}
      >
        <Image
          source={{ uri: `https://picsum.photos/360/640?random=${item.id}` }}
          className="rounded-t-2xl aspect-video w-full mb-2"
        />
        <View className="flex-row items-center p-4">
          <Text thickness="bold" className="text-xl w-64">{item.name}</Text>
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
