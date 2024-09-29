import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import icons from '../../constant/icons'
import CustomButton from '../../components/CustomButton'
import { userSignOut } from '../../lib/appwrite'
import { useAuthContext } from '../../context/AuthProvider'

const userProfile = () => {
  const { setSetUserLogged, setUserLogin } = useAuthContext();

  const logout = async () => {
    await userSignOut();
    setSetUserLogged(false);
    setUserLogin(null);

    router.replace("/");
  }

  return (
    <SafeAreaView className="w-full h-full">
      <TouchableOpacity
        className="items-center mt-12 relative"
        activeOpacity={0.5}
      >
        <ImageBackground
          source={icons.profilePic}
          className="w-24 h-24 overflow-hidden"
          resizeMode='contain'
        />
        <View className="absolute bottom-2.5 right-36 bg-white p-2 rounded-full">
          <Image
            source={icons.camera}
            className="w-5 h-5"
            resizeMethod='contain'
          />
        </View>
      </TouchableOpacity>

      <View className="flex-1 justify-end px-5">
        <CustomButton
          title="Logout"
          containerStyles="mb-10 bg-[#241C1C]"
          textStyles="text-white"
          handlePress={logout}
        />
      </View>
    </SafeAreaView>
  )
}

export default userProfile