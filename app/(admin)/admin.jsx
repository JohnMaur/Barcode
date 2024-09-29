import { View, Text, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import icons from '../../constant/icons';
import { signInAdmin } from '../../lib/appwrite'; 

const Admin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  
  const handleLogin = async () => {
    // Validate form fields
    if (!form.username || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Call your sign-in function
      const session = await signInAdmin(form.username, form.password);
  
      // Store admin session in AsyncStorage
      await AsyncStorage.setItem('adminSession', JSON.stringify(session));
  
      // Navigate to the admin home page
      router.replace("/admin_home");
  
      // Handle successful login
      Alert.alert('Success', 'Logged in successfully');
  
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <SafeAreaView className="bg-primary h-full w-full px-4 justify-center items-center">
      <Image 
        source={icons.admin}
        className="w-32 h-32"
        resizeMode="contain"
      />

      <Text className="font-pextrabold text-5xl mb-5">Admin</Text>

      <FormField
        title="Username"
        placeholder="Username"
        value={form.username}
        handleChangeText={(text) => setForm({ ...form, username: text })}
      />

      <FormField
        title="Password"
        placeholder="Password"
        value={form.password}
        handleChangeText={(text) => setForm({ ...form, password: text })}
        secureTextEntry={true}
      />

      <CustomButton
        title="Login"
        containerStyles="bg-[#241C1C] w-full mt-5"
        textStyles="text-white"
        handlePress={handleLogin}
        isLoading={isSubmitting}
      />

      <View className="flex-row mt-2 items-center">
        <Text className="font-pmedium text-sm">
          Only authorized personnel may log in.
        </Text>
        <Link
          href="/"
          className='font-pbold text-base'
        >
          Back
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Admin;
