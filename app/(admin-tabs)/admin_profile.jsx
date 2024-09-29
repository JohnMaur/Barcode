import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { router } from "expo-router"

import icons from "../../constant/icons"
import CustomButtom from "../../components/CustomButton"
import { useAuthContext } from '../../context/AuthProvider'

const AdminProfile = () => {
  const { signOut } = useAuthContext();

  const logout = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <SafeAreaView className="h-full w-full">
      <View className="items-center mt-12 space-y-2">
        <Text className="font-pmedium text-lg">Your Profile</Text>

        <TouchableOpacity>
          <Image
            source={icons.profilePic}
            className="w-24 h-24"
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>

      <View className="justify-end flex-1 px-5">
        <CustomButtom
          title="Logout"
          containerStyles=" my-5 bg-[#241C1C]"
          textStyles="text-white"
          handlePress={logout}
        />
      </View>
      <StatusBar />
    </SafeAreaView>
  )
}

export default AdminProfile