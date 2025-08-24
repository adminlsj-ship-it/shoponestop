import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CircleCheck as CheckCircle, Crown, ArrowRight } from 'lucide-react-native';
import { useStripe } from '@/hooks/useStripe';

export default function CheckoutSuccessScreen() {
  const { refreshData, getCurrentPlan } = useStripe();

  useEffect(() => {
    // Refresh subscription data after successful payment
    refreshData();
  }, []);

  const currentPlan = getCurrentPlan();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.successIcon}>
          <CheckCircle size={64} color="#10B981" strokeWidth={2} />
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successSubtitle}>
          Welcome to {currentPlan.name}! Your subscription is now active.
        </Text>

        {/* Plan Details */}
        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <Crown size={24} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.planName}>{currentPlan.name}</Text>
          </View>
          <Text style={styles.planPrice}>{currentPlan.price}</Text>
          <Text style={styles.planDescription}>
            You now have access to all premium features and tools to grow your beauty business.
          </Text>
        </View>

        {/* Next Steps */}
        <View style={styles.nextStepsCard}>
          <Text style={styles.nextStepsTitle}>What's Next?</Text>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Complete your business profile setup</Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Add your services and set availability</Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Start receiving bookings from new clients</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.replace('/business/dashboard')}
          >
            <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
            <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.replace('/(tabs)/profile')}
          >
            <Text style={styles.secondaryButtonText}>Back to Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Support Note */}
        <Text style={styles.supportNote}>
          Need help getting started? Our support team is here to help you make the most of your new membership.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  successSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  planName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
  },
  planPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#F43F5E',
    marginBottom: 8,
  },
  planDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  nextStepsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  nextStepsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  stepNumber: {
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  stepText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  actionButtons: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#374151',
  },
  supportNote: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});