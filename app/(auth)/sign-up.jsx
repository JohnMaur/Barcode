import { View, Text, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import { useState } from 'react'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  })

  const submit = async () => {
    const { username, email, password } = form;
  
    if (!username || !email || !password) {
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
      const result = await createUser(email, username, password);
      router.replace("user-home");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <SafeAreaView className="bg-primary h-full w-full px-4 justify-center items-center">
      <Text className="font-pextrabold text-5xl mb-5">Sign Up</Text>

      <FormField
        title="Username"
        placeholder="Username"
        value={form.username}
        handleChangeText={(e) => setform({ ...form, username: e })}
      />

      <FormField
        title="Email"
        placeholder="email"
        keyboardType="email-address"
        value={form.email}
        handleChangeText={(e) => setform({ ...form, email: e })}
      />

      <FormField
        title="Password"
        placeholder="password"
        value={form.password}
        handleChangeText={(e) => setform({ ...form, password: e })}
      />

      <CustomButton
        title="Sign up"
        containerStyles="bg-[#241C1C] w-full mt-5"
        textStyles="text-white"
        handlePress={submit}
      />

      <View className="flex-row mt-2">
        <Text className="font-pmedium text-base">Already have an account? </Text>
        <Link
          href="/sign-in"
          className='font-pbold text-base'
        >
          Sign In
        </Link>
      </View>

    </SafeAreaView>
  )
}

export default SignUp