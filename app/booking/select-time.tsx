import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react-native';

const timeSlots = [
  { time: '9:00 AM', available: true },
  { time: '9:30 AM', available: false },
  { time: '10:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '11:30 AM', available: true },
  { time: '12:00 PM', available: true },
  { time: '12:30 PM', available: true },
  { time: '1:00 PM', available: false },
  { time: '1:30 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '2:30 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '3:30 PM', available: false },
  { time: '4:00 PM', available: true },
];

export default function SelectTimeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const handleContinue = () => {
    if (!selectedTime) return;
    router.push('/booking/confirmation');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#374151" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Select Date & Time</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Service Summary */}
        <View style={styles.serviceSummary}>
          <Text style={styles.summaryTitle}>Premium Hair Cut & Style</Text>
          <Text style={styles.summaryBusiness}>at Luxe Hair Studio</Text>
          <View style={styles.summaryDetails}>
            <View style={styles.summaryItem}>
              <Clock size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.summaryText}>90 minutes</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryPrice}>$85</Text>
            </View>
          </View>
        </View>

        {/* Date Selector */}
        <View style={styles.dateSection}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateSelector}>
            {getNext7Days().map((date, index) => {
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.dayName, isSelected && styles.dayNameSelected]}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text style={[styles.dayNumber, isSelected && styles.dayNumberSelected]}>
                    {date.getDate()}
                  </Text>
                  {isToday && !isSelected && (
                    <View style={styles.todayIndicator} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time Selector */}
        <View style={styles.timeSection}>
          <Text style={styles.sectionTitle}>Available Times</Text>
          <Text style={styles.selectedDateText}>{formatDate(selectedDate)}</Text>
          
          <View style={styles.timeGrid}>
            {timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  !slot.available && styles.timeSlotUnavailable,
                  selectedTime === slot.time && styles.timeSlotSelected,
                ]}
                onPress={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
              >
                <Text style={[
                  styles.timeSlotText,
                  !slot.available && styles.timeSlotTextUnavailable,
                  selectedTime === slot.time && styles.timeSlotTextSelected,
                ]}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Booking Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Booking Information</Text>
          <View style={styles.noteCard}>
            <Text style={styles.noteText}>
              • Please arrive 10 minutes early for your appointment
            </Text>
            <Text style={styles.noteText}>
              • Cancellations must be made 24 hours in advance
            </Text>
            <Text style={styles.noteText}>
              • A deposit may be required for certain services
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity 
          style={[styles.continueButton, !selectedTime && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedTime}
        >
          <Calendar size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.continueButtonText}>
            {selectedTime ? `Continue with ${selectedTime}` : 'Select a time to continue'}
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
  serviceSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 4,
  },
  summaryBusiness: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8B5CF6',
    marginBottom: 12,
  },
  summaryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  summaryPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#F43F5E',
  },
  dateSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  dateSelector: {
    paddingLeft: 20,
  },
  dateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  dateCardSelected: {
    backgroundColor: '#F43F5E',
  },
  dayName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  dayNameSelected: {
    color: '#FFFFFF',
  },
  dayNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
  },
  dayNumberSelected: {
    color: '#FFFFFF',
  },
  todayIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F43F5E',
  },
  timeSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  selectedDateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 100,
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: '#F43F5E',
    borderColor: '#F43F5E',
  },
  timeSlotUnavailable: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    opacity: 0.5,
  },
  timeSlotText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
  },
  timeSlotTextSelected: {
    color: '#FFFFFF',
  },
  timeSlotTextUnavailable: {
    color: '#9CA3AF',
  },
  notesSection: {
    paddingHorizontal: 20,
    marginBottom: 120,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  noteText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 20,
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
  continueButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});