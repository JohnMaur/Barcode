import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'

import icons from "../constant/icons"

const FormField = ({ title, value, placeholder, handleChangeText, otherstyle, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherstyle}`}>
      <Text className="text-base font-pmedium">
        {title}
      </Text>

      <View className="w-full h-16 bg-black-100 rounded-2xl border-black-200 border-2 focus:border-secondary flex-row items-center px-4">
        <TextInput
          className="flex-1 font-semibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField