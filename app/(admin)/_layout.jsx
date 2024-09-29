import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AdminLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name='admin' options={{ headerShown: false }}/>
      </Stack>

      <StatusBar />
    </>
  )
}

export default AdminLayout