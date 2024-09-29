<<<<<<< HEAD
import { TouchableOpacity, Text, Image } from 'react-native'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, customIcon }) => {
=======
import { TouchableOpacity, Text } from 'react-native'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
>>>>>>> 972a831115c9e64752ce2a5335daec1447f798f2
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
<<<<<<< HEAD
      className={`min-h-[62px] flex-row rounded-xl justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
=======
      className={`min-h-[62px] rounded-xl justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
>>>>>>> 972a831115c9e64752ce2a5335daec1447f798f2
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

<<<<<<< HEAD
      {customIcon ? (
        <Image
          source={customIcon}
          className="ml-1.5 w-7 h-7"
          resizeMode='contain'
        />
      ): null}

=======
>>>>>>> 972a831115c9e64752ce2a5335daec1447f798f2
    </TouchableOpacity>
  )
}

export default CustomButton