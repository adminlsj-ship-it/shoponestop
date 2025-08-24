import { Stack } from 'expo-router';

export default function PersonalLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="appointments" />
      <Stack.Screen name="purchases" />
      <Stack.Screen name="payment-methods" />
      <Stack.Screen name="addresses" />
      <Stack.Screen name="reviews" />
      <Stack.Screen name="help" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}