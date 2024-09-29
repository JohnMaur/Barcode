import { View, Text, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'

import icons from '../constant/icons';
import { useAuthContext } from '../context/AuthProvider';

export default function App() {
  const { isLogged, userLogged } = useAuthContext();

  if (isLogged) return <Redirect href="/admin_home" />
  if (userLogged) return <Redirect href="/user-home" />

  return (
    <SafeAreaView className="bg-primary h-full w-full px-4 justify-center items-center space-y-7">
      <TouchableOpacity
        className="h-2/6 w-full border border-gray-500 rounded-2xl items-center justify-center"
        activeOpacity={0.5}
        onPress={() => router.replace("/admin")}
      >
        <Image
          source={icons.admin}
          className="w-32 h-32"
          resizeMode='contain'
        />
        <Text className="font-pmedium text-xl">Continue as{" "}
          <Text className="font-pbold">
            Admin
          </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="h-2/6 w-full border border-gray-500 rounded-2xl justify-center items-center"
        activeOpacity={0.5}
        onPress={() => router.replace("/sign-in")}
      >
        <Image
          source={icons.user}
          className="w-32 h-32"
          resizeMode='contain'
        />
        <Text className="font-pmedium text-xl">Continue as{" "}
          <Text className="font-pbold">
            User
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
