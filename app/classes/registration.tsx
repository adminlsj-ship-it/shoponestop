import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, User, Mail, Phone, CreditCard, Calendar, Clock, MapPin, GraduationCap, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function ClassRegistrationScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    dietaryRestrictions: '',
    specialRequests: '',
  });
  const [loading, setLoading] = useState(false);

  const classDetails = {
    title: 'Professional Makeup Masterclass',
    instructor: 'Jessica Miller',
    business: 'Glow Beauty Academy',
    date: '2024-12-25',
    time: '10:00 AM - 1:00 PM',
    location: 'Glow Beauty Academy, 123 Fashion Ave, Manhattan, NY',
    price: 150,
    spotsRemaining: 4,
  };

  const handleRegister = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      setLoading(false);
      router.push('/classes/confirmation');
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
          <Text style={styles.title}>Class Registration</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Class Summary */}
        <View style={styles.classSummary}>
          <Text style={styles.summaryTitle}>{classDetails.title}</Text>
          <Text style={styles.summaryInstructor}>with {classDetails.instructor}</Text>
          <Text style={styles.summaryBusiness}>{classDetails.business}</Text>
          
          <View style={styles.summaryDetails}>
            <View style={styles.summaryItem}>
              <Calendar size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.summaryText}>{classDetails.date}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Clock size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.summaryText}>{classDetails.time}</Text>
            </View>
            <View style={styles.summaryItem}>
              <MapPin size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.summaryText}>{classDetails.location}</Text>
            </View>
          </View>
          
          <View style={styles.summaryFooter}>
            <Text style={styles.summaryPrice}>${classDetails.price}</Text>
            <Text style={styles.spotsRemaining}>
              {classDetails.spotsRemaining} spots remaining
            </Text>
          </View>
        </View>

        {/* Registration Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Student Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>First Name *</Text>
            <View style={styles.inputContainer}>
              <User size={20} color="#9CA3AF" strokeWidth={2} />
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(text) => setFormData({...formData, firstName: text})}
                placeholder="Enter your first name"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Last Name *</Text>
            <View style={styles.inputContainer}>
              <User size={20} color="#9CA3AF" strokeWidth={2} />
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(text) => setFormData({...formData, lastName: text})}
                placeholder="Enter your last name"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email *</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#9CA3AF" strokeWidth={2} />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#9CA3AF" strokeWidth={2} />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
                placeholder="Enter your phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Emergency Contact Name</Text>
            <View style={styles.inputContainer}>
              <User size={20} color="#9CA3AF" strokeWidth={2} />
              <TextInput
                style={styles.input}
                value={formData.emergencyContact}
                onChangeText={(text) => setFormData({...formData, emergencyContact: text})}
                placeholder="Contact person name"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Emergency Contact Phone</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#9CA3AF" strokeWidth={2} />
              <TextInput
                style={styles.input}
                value={formData.emergencyPhone}
                onChangeText={(text) => setFormData({...formData, emergencyPhone: text})}
                placeholder="Emergency contact phone"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        {/* Additional Information */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Dietary Restrictions / Allergies</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.dietaryRestrictions}
              onChangeText={(text) => setFormData({...formData, dietaryRestrictions: text})}
              placeholder="Please list any allergies or dietary restrictions..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Special Requests</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.specialRequests}
              onChangeText={(text) => setFormData({...formData, specialRequests: text})}
              placeholder="Any special accommodations or requests..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <CreditCard size={20} color="#374151" strokeWidth={2} />
              <Text style={styles.paymentTitle}>Payment Method</Text>
            </View>
            <TouchableOpacity style={styles.paymentMethod}>
              <Text style={styles.paymentMethodText}>•••• •••• •••• 4242</Text>
              <Text style={styles.changePaymentText}>Change</Text>
            </TouchableOpacity>
            <Text style={styles.paymentNote}>
              You will be charged $150 upon successful registration
            </Text>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>Registration Terms</Text>
          <Text style={styles.termsText}>
            • Full payment is required to secure your spot{'\n'}
            • Cancellations must be made 48 hours in advance for full refund{'\n'}
            • Materials and refreshments are included in the class fee{'\n'}
            • Please arrive 15 minutes early for check-in
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity 
          style={[styles.registerButton, loading && styles.registerButtonLoading]}
          onPress={handleRegister}
          disabled={loading}
        >
          <GraduationCap size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.registerButtonText}>
            {loading ? 'Registering...' : 'Complete Registration'}
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
  classSummary: {
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
  summaryInstructor: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8B5CF6',
    marginBottom: 2,
  },
  summaryBusiness: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  summaryDetails: {
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  summaryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  summaryPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#F43F5E',
  },
  spotsRemaining: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#EF4444',
  },
  formSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 80,
    textAlignVertical: 'top',
  },
  paymentSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  paymentTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentMethodText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  changePaymentText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#F43F5E',
  },
  paymentNote: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  termsSection: {
    paddingHorizontal: 20,
    marginBottom: 120,
  },
  termsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
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
  registerButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  registerButtonLoading: {
    opacity: 0.7,
  },
  registerButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});