import { Stack } from 'expo-router'

const ProductPageLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='productPage' options={{ headerShown: false }} />
    </Stack>
  )
}

export default ProductPageLayout