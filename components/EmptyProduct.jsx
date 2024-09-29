import { View, Text, Image } from 'react-native'

import images from "../constant/images"

const EmptyProduct = ({ title, subtitle, containerStyle }) => {
  return (
    <View className="w-full items-center">
      <Image 
        source={images.noData}
        className={`w-32 h-32 ${containerStyle}`}
        resizeMode='contain'
      />

      <Text className="font-psemibold text-[#888] text-base mt-2">{title}</Text>
      <Text className="font-pregular text-sm">{subtitle}</Text>
    </View>
  )
}

export default EmptyProduct