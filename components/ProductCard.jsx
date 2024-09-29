import { View, Text, Image, TouchableOpacity } from 'react-native'

const ProductCard = ({ name, price, barcode, quantity, imgURL, handlePress }) => {
  return (
    <TouchableOpacity
      className={`bg-white m-1.5 w-[48%] items-center py-2 rounded-lg shadow-lg`}
      activeOpacity={0.7} 
      onPress={handlePress}
    >
      <Image
        source={{ uri: imgURL }}
        className={`w-32 h-40`}
        resizeMode={`contain`}
      />
      <View className="items-start w-full mt-3 pl-2">
        <Text className="font-pregular text-sm">{name}</Text>
        <Text className="text-red-500 font-psemibold">₱{price}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard