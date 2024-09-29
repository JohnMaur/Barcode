import { View, TextInput, Image } from 'react-native'

import icons from "../constant/icons"

const SearchInput = ({ initialQuery, containerStyle }) => {
  return (
    <View className={`w-full h-16 bg-black-100 rounded-2xl border-gray-600 border-2 focus:border-secondary flex-row items-center px-4 ${containerStyle}`}>
      <TextInput
        className="flex-1 font-semibold text-base"
        value=''
        placeholder="Search a product"
        placeholderTextColor="#7B7B8B"
      />
      <Image
        source={icons.search}
        className="w-6 h-6"
        resizeMode='contain'
      />
    </View>
  )
}

export default SearchInput