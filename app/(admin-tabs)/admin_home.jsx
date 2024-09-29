import { View, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { router } from 'expo-router'

import SearchInput from '../../components/SearchInput'
import EmptyProduct from '../../components/EmptyProduct'
import { getAllProduct } from '../../lib/appwrite'
import ProductCard from '../../components/ProductCard'
import fetchProduct from '../../lib/fetchProduct'

const AdminHome = () => {
  const { products: products, refetch } = fetchProduct(getAllProduct);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  const handleProductRoute = (item) => {
    console.log("Navigating with item:", item);  // Check the item data
    router.push({
      pathname: "productPage",
      params: {
        name: item.product_name,
        price: item.product_price,
        quantity: item.quantity,
        imgURL: encodeURIComponent(item.product_image),
        barcode: item.barcode,
      },
    });
  };

  return (
    <SafeAreaView className="w-full h-full px-5">
      <SearchInput
        containerStyle="mt-5"
      />
      <View className="pt-5 pb-28">
        <FlatList
          data={products}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <ProductCard
              name={item.product_name}
              price={item.product_price}
              quantity={item.quantity}
              imgURL={item.product_image}
              handlePress={() => handleProductRoute(item)}
            />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListEmptyComponent={() => (
            <EmptyProduct
              title="No Products Available"
              subtitle="Check your connection or come back later"
              containerStyle="mt-[25vh]"
            />
          )}

          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

    </SafeAreaView>
  )
}

export default AdminHome