import { TouchableOpacity, Text } from 'react-native'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`min-h-[62px] rounded-xl justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
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

    </TouchableOpacity>
  )
}

export default CustomButton