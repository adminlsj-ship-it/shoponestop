import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  CircleCheck as CheckCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Download,
  Share,
  GraduationCap,
  Bell
} from 'lucide-react-native';

export default function ClassConfirmationScreen() {
  const registrationDetails = {
    confirmationNumber: 'CLS-2024-001234',
    className: 'Professional Makeup Masterclass',
    instructor: 'Jessica Miller',
    business: 'Glow Beauty Academy',
    date: '2024-12-25',
    time: '10:00 AM - 1:00 PM',
    location: 'Glow Beauty Academy, 123 Fashion Ave, Manhattan, NY',
    price: 150,
    studentName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
  };

  const handleAddToCalendar = () => {
    Alert.alert('Calendar', 'Adding class to your calendar...');
  };

  const handleDownloadTicket = () => {
    Alert.alert('Download', 'Downloading your class ticket...');
  };

  const handleShareClass = () => {
    Alert.alert('Share', 'Sharing class details...');
  };

  const handleSetReminder = () => {
    Alert.alert('Reminder', 'Reminder set for 1 hour before class!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <View style={styles.successHeader}>
          <View style={styles.successIcon}>
            <CheckCircle size={48} color="#10B981" strokeWidth={2} />
          </View>
          <Text style={styles.successTitle}>Registration Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            You're all set for the {registrationDetails.className}
          </Text>
          <Text style={styles.confirmationNumber}>
            Confirmation: {registrationDetails.confirmationNumber}
          </Text>
        </View>

        {/* Class Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Class Information</Text>
          
          <View style={styles.detailItem}>
            <GraduationCap size={20} color="#F43F5E" strokeWidth={2} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Class</Text>
              <Text style={styles.detailValue}>{registrationDetails.className}</Text>
              <Text style={styles.detailSubValue}>with {registrationDetails.instructor}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Calendar size={20} color="#8B5CF6" strokeWidth={2} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>{registrationDetails.date}</Text>
              <Text style={styles.detailSubValue}>{registrationDetails.time}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <MapPin size={20} color="#10B981" strokeWidth={2} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{registrationDetails.business}</Text>
              <Text style={styles.detailSubValue}>{registrationDetails.location}</Text>
            </View>
          </View>
        </View>

        {/* Student Information */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Student Information</Text>
          
          <View style={styles.detailItem}>
            <Mail size={20} color="#F59E0B" strokeWidth={2} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Confirmation sent to</Text>
              <Text style={styles.detailValue}>{registrationDetails.email}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Phone size={20} color="#6B7280" strokeWidth={2} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Contact Number</Text>
              <Text style={styles.detailValue}>{registrationDetails.phone}</Text>
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.paymentSummary}>
          <Text style={styles.cardTitle}>Payment Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Class Fee</Text>
            <Text style={styles.summaryValue}>${registrationDetails.price}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Processing Fee</Text>
            <Text style={styles.summaryValue}>$3.50</Text>
          </View>
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>${registrationDetails.price + 3.50}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={handleAddToCalendar}>
              <Calendar size={24} color="#F43F5E" strokeWidth={2} />
              <Text style={styles.actionText}>Add to Calendar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard} onPress={handleSetReminder}>
              <Bell size={24} color="#8B5CF6" strokeWidth={2} />
              <Text style={styles.actionText}>Set Reminder</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard} onPress={handleDownloadTicket}>
              <Download size={24} color="#10B981" strokeWidth={2} />
              <Text style={styles.actionText}>Download Ticket</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard} onPress={handleShareClass}>
              <Share size={24} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.actionText}>Share Class</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Important Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Important Notes</Text>
          <View style={styles.notesCard}>
            <Text style={styles.noteText}>
              📧 A detailed confirmation email has been sent to your inbox
            </Text>
            <Text style={styles.noteText}>
              📱 You'll receive SMS reminders 24 hours and 1 hour before class
            </Text>
            <Text style={styles.noteText}>
              🎒 All materials and refreshments are included
            </Text>
            <Text style={styles.noteText}>
              ⏰ Please arrive 15 minutes early for check-in
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={() => router.replace('/(tabs)/classes')}
        >
          <Text style={styles.doneButtonText}>Done</Text>
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
  successHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 32,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 8,
  },
  successSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  confirmationNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#8B5CF6',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  detailsCard: {
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
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  detailSubValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  paymentSummary: {
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  summaryValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  totalLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#10B981',
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  actionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
  notesSection: {
    paddingHorizontal: 20,
    marginBottom: 120,
  },
  notesCard: {
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
    marginBottom: 12,
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
  doneButton: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});