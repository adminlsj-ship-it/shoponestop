import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Loader as Loader2 } from 'lucide-react-native';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

export function LoadingSpinner({ message = 'Loading...', size = 24 }: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <Loader2 size={size} color="#F43F5E" strokeWidth={2} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
});