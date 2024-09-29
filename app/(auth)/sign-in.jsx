import { View, Text, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import { useState } from 'react'

import CustomButton from '../../components/CustomButton'
import FormField from '../../components/FormField'
import icons from '../../constant/icons'
import { userSignIn } from "../../lib/appwrite"

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const login = async () => {
    const { email, password } = form;
  
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  
    // Validate password length
    if (password.length < 8 || password.length > 265) {
      Alert.alert("Error", "Password must be between 8 and 265 characters");
      return;
    }
  
    setIsSubmitting(true);
    try {
      // Create user and handle success
      const result = await userSignIn(email, password);
      router.replace("/user-home");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full w-full px-4 justify-center items-center">
      <Image
        source={icons.user}
        className="w-32 h-32"
        resizeMode='contain'
      />

      <Text className="font-pextrabold text-5xl mb-5">Log In</Text>

      <FormField
        title="Email"
        placeholder="Email"
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        keyboardType="email-address"
      />
      <FormField
        title="Password"
        placeholder="password"
        value={form.password}
        handleChangeText={(e) => setForm({ ...form, password: e })}
      />

      <CustomButton
        title="Log in"
        containerStyles="bg-[#241C1C] w-full mt-5"
        textStyles="text-white"
        handlePress={login}
      />

      <View className="flex-row mt-2">
        <Text className="font-pmedium text-base">Don't have an account? </Text>
        <Link
          href="/sign-up"
          className='font-pbold text-base'
        >
          Sign Up
        </Link>
      </View>

    </SafeAreaView>
  )
}

export default SignIn
