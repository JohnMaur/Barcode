import React, { useState, useEffect } from "react";
import { Text, View, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, Camera } from "expo-camera";
import { router } from "expo-router";

import CustomButton from "../../components/CustomButton";
import icons from "../../constant/icons";

import { getAllProduct } from "../../lib/appwrite";

const userBarcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dotCount, setDotCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [button, setButton] = useState(true);
  const [barcodeScanned, setBarcodeScanned] = useState(true);

  const getProduct = async () => {
    try {
      const product = await getAllProduct();
      setProducts(product.documents);
    } catch (error) {
      Alert.alert('Error', "Failed to get products");
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev < 3 ? prev + 1 : 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBarcodeScanned = ({ data }) => {
    setScanned(true);
    const product = products.find(product => product.barcode === data);

    if (product) {
      handleProductRoute(product);
    } else {
      Alert.alert('Error', 'No product found for this barcode.');
    }
  };

  const handleProductRoute = (item) => {
    router.push({
      pathname: "productPage",
      params: {
        name: item.product_name,
        price: item.product_price,
        quantity: item.quantity,
        imgURL: encodeURIComponent(item.product_image),
        barcode: item.barcode,
        button: button,
        barcodeScanned: barcodeScanned,
      },
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView className="w-full h-full">
      <View className="flex-1 justify-center items-center">
        {!scanned ? (
          <View className='flex-row'>
            <Image
              source={icons.barcodeScannerIconBlack}
              className='w-7 h-7 mr-1'
              resizeMode="contain"
            />
            <Text className='font-pregular text-3xl tracking-widest'>
              Scanning
              <Text className="font-pbold text-4xl tracking-widest">{'.'.repeat(dotCount)}</Text>
            </Text>
          </View>
        ) : null}
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              "qr",
              "ean13",
              "ean8",
              "upce",
              "pdf417",
              "code128",
              "code39",
              "itf14",
            ],
          }}
          className="w-full h-[65vh]"
        />
      </View>

      {scanned && (
        <View className="p-5">
          <CustomButton
            title="Tap to Scan Again"
            containerStyles="w-full bg-[#241C1C]"
            textStyles="text-white"
            handlePress={() => setScanned(false)}
            customIcon={icons.barcodeScannerIcon}
          />
        </View>
      )}

    </SafeAreaView>
  );
}

export default userBarcode;
