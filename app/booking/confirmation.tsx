import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Clock, MapPin, User, CreditCard, MessageCircle, CircleCheck as CheckCircle, Bell } from 'lucide-react-native';

export default function BookingConfirmationScreen() {
  const [notes, setNotes] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const bookingDetails = {
    service: 'Premium Hair Cut & Style',
    business: 'Luxe Hair Studio',
    stylist: 'Jessica Miller',
    date: 'Tomorrow, Dec 18',
    time: '2:30 PM',
    duration: '90 minutes',
    price: 85,
    location: '123 Beverly Hills Blvd, Beverly Hills, CA',
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    
    // Simulate booking API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Booking Confirmed!',
        'Your appointment has been successfully booked. You will receive a confirmation text message shortly.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)/bookings'),
          },
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#374151" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.title}>Confirm Booking</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Booking Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Booking Summary</Text>
          
          <View style={styles.summaryItem}>
            <User size={20} color="#8B5CF6" strokeWidth={2} />
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Service</Text>
              <Text style={styles.summaryValue}>{bookingDetails.service}</Text>
              <Text style={styles.summarySubValue}>with {bookingDetails.stylist}</Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <Calendar size={20} color="#F43F5E" strokeWidth={2} />
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Date & Time</Text>
              <Text style={styles.summaryValue}>{bookingDetails.date}</Text>
              <Text style={styles.summarySubValue}>{bookingDetails.time} ({bookingDetails.duration})</Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <MapPin size={20} color="#10B981" strokeWidth={2} />
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Location</Text>
              <Text style={styles.summaryValue}>{bookingDetails.business}</Text>
              <Text style={styles.summarySubValue}>{bookingDetails.location}</Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <CreditCard size={20} color="#F59E0B" strokeWidth={2} />
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={styles.summaryPrice}>${bookingDetails.price}</Text>
            </View>
          </View>
        </View>

        {/* Special Notes */}
        <View style={styles.notesCard}>
          <Text style={styles.cardTitle}>Special Notes (Optional)</Text>
          <View style={styles.notesContainer}>
            <MessageCircle size={20} color="#6B7280" strokeWidth={2} />
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Any special requests or notes for your stylist..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Notification Preferences */}
        <View style={styles.notificationCard}>
          <Text style={styles.cardTitle}>Notification Preferences</Text>
          <TouchableOpacity 
            style={styles.notificationOption}
            onPress={() => setReminderEnabled(!reminderEnabled)}
          >
            <View style={styles.notificationInfo}>
              <Bell size={20} color="#F43F5E" strokeWidth={2} />
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>SMS Reminders</Text>
                <Text style={styles.notificationDesc}>
                  Get text reminders 24 hours and 1 hour before your appointment
                </Text>
              </View>
            </View>
            <View style={[
              styles.toggleSwitch,
              reminderEnabled && styles.toggleSwitchActive
            ]}>
              {reminderEnabled && (
                <CheckCircle size={16} color="#FFFFFF" strokeWidth={2} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentCard}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.paymentMethod}>
            <CreditCard size={20} color="#374151" strokeWidth={2} />
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>•••• •••• •••• 4242</Text>
              <Text style={styles.paymentDesc}>Visa ending in 4242</Text>
            </View>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
          <Text style={styles.paymentNote}>
            You will be charged after your appointment is completed
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity 
          style={[styles.confirmButton, loading && styles.confirmButtonLoading]}
          onPress={handleConfirmBooking}
          disabled={loading}
        >
          <CheckCircle size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.confirmButtonText}>
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  summarySubValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  summaryPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#F43F5E',
  },
  notesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  notesInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
    textAlignVertical: 'top',
    minHeight: 60,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  notificationDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  toggleSwitch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: '#F43F5E',
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 16,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  paymentDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  changeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#F43F5E',
  },
  paymentNote: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  confirmButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmButtonLoading: {
    opacity: 0.7,
  },
  confirmButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});