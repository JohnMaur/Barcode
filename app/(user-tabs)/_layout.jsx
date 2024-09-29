import { View, Text, Image } from 'react-native'
import { Tabs } from 'expo-router'

import icons from '../../constant/icons'

const TabIcon = ({ icon, focused, name }) => (
  <View className={`items-center w-full h-full justify-center gap-1 ${focused ? "bg-[#F0E2B7]" : "bg-[#E5E3DD]"}`}>
    <Image
      source={icon}
      className="w-6 h-6"
      resizeMethod="contain"
    />

    <Text
      className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
    >
      {name}
    </Text>
  </View>
);

const userLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 2,
            borderTopColor: "#F0E2B7",
            height: 72,
          }
        }}
      >
        <Tabs.Screen
          name='user-home'
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={icons.home}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='user-barcode'
          options={{
            title: "Barcode",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={icons.barcode}
                name="Barcode"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='user-cart'
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={icons.cart}
                name="Cart"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='user-profile'
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={icons.profile}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default userLayout