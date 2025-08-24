import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react-native';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const hours = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00'];

const appointments = [
  { id: '1', time: '10:00', duration: 90, client: 'Emma Wilson', service: 'Hair Cut' },
  { id: '2', time: '2:30', duration: 60, client: 'Sofia Martinez', service: 'Makeup' },
  { id: '3', time: '4:00', duration: 120, client: 'Isabella Chen', service: 'Spa Treatment' },
];

export default function BusinessCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setSelectedDate(newDate);
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
        <Text style={styles.title}>Calendar</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Calendar Navigation */}
      <View style={styles.calendarNav}>
        <TouchableOpacity onPress={() => navigateDate('prev')}>
          <ChevronLeft size={24} color="#374151" strokeWidth={2} />
        </TouchableOpacity>
        
        <View style={styles.dateContainer}>
          <Text style={styles.currentDate}>{formatDate(selectedDate)}</Text>
        </View>
        
        <TouchableOpacity onPress={() => navigateDate('next')}>
          <ChevronRight size={24} color="#374151" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* View Mode Toggle */}
      <View style={styles.viewModeContainer}>
        <View style={styles.viewModeToggle}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'day' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('day')}
          >
            <Text style={[styles.viewModeText, viewMode === 'day' && styles.viewModeTextActive]}>
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'week' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('week')}
          >
            <Text style={[styles.viewModeText, viewMode === 'week' && styles.viewModeTextActive]}>
              Week
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar Content */}
      <ScrollView style={styles.calendarContent} showsVerticalScrollIndicator={false}>
        {viewMode === 'day' ? (
          <View style={styles.dayView}>
            {hours.map((hour) => {
              const appointment = appointments.find(apt => apt.time === hour);
              
              return (
                <View key={hour} style={styles.timeSlot}>
                  <Text style={styles.timeLabel}>{hour}</Text>
                  <View style={styles.slotContent}>
                    {appointment ? (
                      <TouchableOpacity style={styles.appointmentCard}>
                        <Text style={styles.appointmentClient}>{appointment.client}</Text>
                        <Text style={styles.appointmentService}>{appointment.service}</Text>
                        <Text style={styles.appointmentDuration}>{appointment.duration} min</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={styles.emptySlot}>
                        <Plus size={16} color="#D1D5DB" strokeWidth={2} />
                        <Text style={styles.emptySlotText}>Available</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.weekView}>
            <View style={styles.weekHeader}>
              {days.map((day, index) => (
                <Text key={day} style={styles.dayHeader}>{day}</Text>
              ))}
            </View>
            <Text style={styles.weekNote}>Week view coming soon...</Text>
          </View>
        )}
      </ScrollView>

      {/* Availability Settings */}
      <View style={styles.availabilitySection}>
        <TouchableOpacity style={styles.availabilityButton}>
          <CalendarIcon size={20} color="#F43F5E" strokeWidth={2} />
          <Text style={styles.availabilityText}>Set Availability Hours</Text>
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
  addButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
  },
  currentDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  viewModeContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  viewModeToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewModeButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  viewModeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  viewModeTextActive: {
    color: '#F43F5E',
  },
  calendarContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dayView: {
    paddingBottom: 100,
  },
  timeSlot: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    width: 60,
    paddingTop: 12,
  },
  slotContent: {
    flex: 1,
    marginLeft: 16,
  },
  appointmentCard: {
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    padding: 16,
  },
  appointmentClient: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appointmentService: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  appointmentDuration: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  emptySlot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptySlotText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  weekView: {
    paddingBottom: 100,
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
  },
  weekNote: {
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginTop: 40,
  },
  availabilitySection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  availabilityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 12,
  },
  availabilityText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F43F5E',
  },
});