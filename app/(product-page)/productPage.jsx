import { View, Text, Image, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Barcode from 'react-native-barcode-svg';

import icons from '../../constant/icons';
import CustomButton from "../../components/CustomButton"

const ProductPage = () => {
  const { name, price, quantity, imgURL, barcode, button, userAccount, barcodeScanned } = useLocalSearchParams();

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="bg-white flex-row items-center py-4 shadow-xl border-b-[1px] border-gray-300">
      <TouchableOpacity onPress={() => router.replace(barcodeScanned ? "user-barcode" : (button ? "user-home" : "admin-home"))}>
          <Image
            source={icons.backButton}
            className="w-7 h-7 ml-3"
            resizeMode='contain'
          />
        </TouchableOpacity>

        <Text className="font-pbold text-xl tracking-widest ml-2">Product Details</Text>
      </View>
      <Image
        source={{ uri: imgURL }}
        className="w-full h-[45%] bg-[#F3F3F3]"
        resizeMode="contain"
      />
      <View className="ml-3 mt-2">
        <Text className="font-pregular text-lg">{name}</Text>
        <Text className="font-pbold text-lg text-red-600">₱ {price}</Text>
        {quantity ? (
          <Text className="font-pregular text-lg">Total left: {quantity}</Text>
        ) : null}

      </View>

      <View className="mt-4 w-full items-center">
        <Text className="font-pmedium text-gray-600 text-base mb-1">Scan your product</Text>
        <View className="border border-slate-500 px-3 py-4 rounded-sm">
          <Barcode value={barcode} format="CODE128" />
        </View>
      </View>

      {button ? (
        <View className="flex-row w-full pl-4 pr-6 justify-between items-end flex-1 mb-5">
          <CustomButton
            title="Buy"
            containerStyles="bg-[#241C1C] w-1/2 mr-2"
            textStyles="text-white"
          />
          <CustomButton
            title="Add to cart"
            containerStyles="bg-[#C8C4B7] w-1/2"
          />
        </View>
      ) : null}

    </SafeAreaView>
  );
};

export default ProductPage;
