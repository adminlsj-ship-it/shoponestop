import { Stack } from 'expo-router';

export default function BookingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="service-details" />
      <Stack.Screen name="select-time" />
      <Stack.Screen name="confirmation" />
    </Stack>
  );
}