import { Alert } from "react-native";
import { useState, useEffect } from "react";

const fetchProduct = (fn) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const product = await fn();
      setProducts(product.documents);
    } catch (error) {
      Alert.alert("Error", "Failed to get products")
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);
  
  const refetch = () => getProduct();

  return { products, refetch };
}

export default fetchProduct