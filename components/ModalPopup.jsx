import { View, Text, Modal, Image } from 'react-native';

import CustomButton from './CustomButton';

const ModalPopup = ({ visible, onClose, productDetails }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-transparent bg-opacity-50">
        <View className="bg-white w-[90%] p-5 rounded px-5">
          <Image
            source={{ uri: productDetails.product_image }}
            className="w-full h-72 bg-[#F3F3F3]"
            resizeMode="contain"
          />

          <Text className="font-pregular text-lg">{productDetails.product_name}</Text>
          <Text className="font-pbold text-lg text-red-600">Price: ₱{productDetails.product_price}</Text>
          <Text className="font-pregular text-lg">Total left: {productDetails.quantity}</Text>

          <CustomButton 
            title='Close'
            containerStyles='w-full p-2 bg-[#241C1C]'
            textStyles='text-white'
            handlePress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalPopup;
