import { TouchableOpacity, View, Image, ScrollView, Text, LogBox, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Barcode from "react-native-barcode-svg";
import * as ImagePicker from 'expo-image-picker';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import icons from '../../constant/icons';
import { firebase } from "../../firebaseConfig"
import { createProduct } from '../../lib/appwrite';
import { useAuthContext } from "../../context/AuthProvider"

// Suppress specific warnings
LogBox.ignoreLogs([
  "Warning: Barcode: Support for defaultProps will be removed from function components in a future major release.",
]);

const AdminAddProduct = () => {
  const { adminSession } = useAuthContext();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [barcode, setBarcode] = useState('');
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  const generateBarcode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 12;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    setBarcode(result);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageAndInsertProduct = async () => {
    if (!productName || !productPrice || !quantity || !image) {
      setModalMessage('Please fill in all fields and select an image');
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    try {
      setLoading(true);

      // 1. Upload image to Firebase
      const imageName = `product_${Date.now()}`;
      const response = await fetch(image);
      const blob = await response.blob();
      const ref = firebase.storage().ref().child(`images/${imageName}`);
      await ref.put(blob);
      const imageUrl = await ref.getDownloadURL();

      // 2. Insert product data into Appwrite
      const productData = {
        product_name: productName,
        product_price: productPrice,
        product_image: imageUrl,
        quantity: String(quantity),
        barcode: barcode || 'N/A',
        admin: adminSession.adminId,
      }; 
      await createProduct(productData); // Call your Appwrite function here

      setModalMessage('Product added successfully!');
      setIsSuccess(true);
      setModalVisible(true);
      setProductName('');
      setProductPrice('');
      setImage(null);
      setQuantity(0);
      setBarcode('');

    } catch (error) {
      console.error('Error adding product: ', error);
      setModalMessage('Something went wrong. Please try again.');
      setIsSuccess(false);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="w-full h-full px-4 bg-white">
      <ScrollView>
        <FormField
          title="Product name"
          placeholder="Product name"
          value={productName}
          handleChangeText={setProductName}
          otherstyle="mt-5"
        />

        <FormField
          title="Product price"
          placeholder="Product price"
          value={productPrice}
          handleChangeText={setProductPrice}
          otherstyle="mt-5"
          keyboardType="numeric"
        />

        <TouchableOpacity
          activeOpacity={0.4}
          className="w-full h-[45vh] rounded-md shadow-md items-center justify-center mt-5 border border-[#c7c7c7]"
          onPress={pickImage}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              className="w-full h-full"
              resizeMode='contain'
            />
          ) : (
            <Image
              source={icons.add}
              className="w-12 h-12"
              resizeMode='contain'
            />
          )}
        </TouchableOpacity>

        <View className="mt-5 mb-0">
          <Text className="mr-2 font-pregular text-base">
            Select or Type Quantity:
          </Text>
          <View className="border border-[#c7c7c7] rounded-md mt-2 w-full h-13 flex-row items-center">
            <TextInput
              className="flex-1 w-[85%] h-full px-2 font-semibold text-base"
              value={quantity === 0 ? null : String(quantity)} 
              onChangeText={(text) => setQuantity(Number(text) || 0)}
              placeholder="Type quantity"
              keyboardType="numeric" 
            />
            <View className="h-full w-[1px] bg-[#c7c7c7]" />
            <Picker
              onValueChange={(itemValue) => setQuantity(itemValue)}
              style={{ width: '15%', height: '100%' }}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <Picker.Item key={num} label={`${num}`} value={num} />
              ))}
            </Picker>
          </View>
        </View>

        {!barcode ? (
          <CustomButton
            title="Generate Barcode"
            containerStyles="bg-[#241C1C] mt-5"
            textStyles="text-white"
            handlePress={generateBarcode}
          />
        ) : null}

        <View className="items-center mt-5 border py-4 px-2 rounded-sm">
          {barcode ? (
            <Barcode value={barcode} format='CODE128' />
          ) : (
            <Text className="font-pregular text-sm">Click
              <Text className="font-psemibold"> "Generate Barcode" </Text>
              to generate
              <Text className="font-psemibold"> Barcode</Text>
            </Text>
          )}
        </View>

        <CustomButton
          title="Add Product"
          containerStyles="bg-[#241C1C] mt-5 mb-5"
          textStyles="text-white"
          handlePress={uploadImageAndInsertProduct}
          isLoading={loading}
        />
      </ScrollView>

      {/* Modal for Success/Error Messages */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-transparent bg-opacity-50">
          <View className="w-80 bg-[#E5E5E5] rounded-lg p-4 py-10">
            <Text className={`text-center text-base font-pmedium mb-4 px-2`}>{modalMessage}</Text>
            <CustomButton
              title="Close"
              containerStyles={`${isSuccess ? "bg-green-600" : "bg-red-600"} "mt-4"`}
              textStyles="text-white"
              handlePress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default AdminAddProduct;
