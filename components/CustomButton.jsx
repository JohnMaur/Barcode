import { TouchableOpacity, Text, Image } from 'react-native'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, customIcon }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`min-h-[62px] flex-row rounded-xl justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <Text className={`${textStyles} font-psemibold text-lg text-center`}>
          Loading...
        </Text>
      ) : (
        <Text className={`${textStyles} font-psemibold text-lg text-center`}>
          {title}
        </Text>
      )}

      {customIcon ? (
        <Image
          source={customIcon}
          className="ml-1.5 w-7 h-7"
          resizeMode='contain'
        />
      ): null}

    </TouchableOpacity>
  )
}

export default CustomButton