import { Stack } from 'expo-router';

export default function CheckoutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="cart" />
      <Stack.Screen name="shipping" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="success" />
    </Stack>
  );
}