import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Mail, Lock, User, Phone, MapPin, Briefcase, Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { ErrorMessage } from '@/components/ErrorMessage';

export default function SignUpScreen() {
  const [accountType, setAccountType] = useState<'client' | 'business'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessName: '',
    businessType: '',
    location: '',
  });

  const handleSignUp = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (accountType === 'business' && (!formData.businessName || !formData.businessType || !formData.location)) {
      setError('Please fill in all business information');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        userType: accountType,
        phone: formData.phone,
        businessData: accountType === 'business' ? {
          businessName: formData.businessName,
          businessType: formData.businessType,
          location: formData.location,
        } : undefined,
      });
      
      router.replace('/(tabs)');
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
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
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>BeautyBook</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Join ShopOneStop</Text>
          <Text style={styles.welcomeTitle}>Join BeautyBook</Text>
          <Text style={styles.welcomeSubtitle}>
            {accountType === 'business' 
              ? 'Start growing your beauty business today'
              : 'Discover amazing beauty services and products'
            }
          </Text>
        </View>

        {/* Account Type Toggle */}
        <View style={styles.accountTypeContainer}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, accountType === 'client' && styles.toggleButtonActive]}
              onPress={() => setAccountType('client')}
            >
              <User size={20} color={accountType === 'client' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
              <Text style={[styles.toggleText, accountType === 'client' && styles.toggleTextActive]}>
                Client
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, accountType === 'business' && styles.toggleButtonActive]}
              onPress={() => setAccountType('business')}
            >
              <Briefcase size={20} color={accountType === 'business' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
              <Text style={[styles.toggleText, accountType === 'business' && styles.toggleTextActive]}>
                Business
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {error && (
            <ErrorMessage 
              message={error} 
              onRetry={() => setError(null)}
            />
          )}

          {/* Personal Information */}
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
            <Text style={styles.inputLabel}>Phone</Text>
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

          {/* Business-specific fields */}
          {accountType === 'business' && (
            <>
              <View style={styles.businessSection}>
                <Text style={styles.sectionTitle}>Business Information</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Business Name *</Text>
                <View style={styles.inputContainer}>
                  <Briefcase size={20} color="#9CA3AF" strokeWidth={2} />
                  <TextInput
                    style={styles.input}
                    value={formData.businessName}
                    onChangeText={(text) => setFormData({...formData, businessName: text})}
                    placeholder="Enter your business name"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Business Type *</Text>
                <View style={styles.inputContainer}>
                  <Briefcase size={20} color="#9CA3AF" strokeWidth={2} />
                  <TextInput
                    style={styles.input}
                    value={formData.businessType}
                    onChangeText={(text) => setFormData({...formData, businessType: text})}
                    placeholder="e.g., Hair Salon, Spa, Makeup Artist"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Location *</Text>
                <View style={styles.inputContainer}>
                  <MapPin size={20} color="#9CA3AF" strokeWidth={2} />
                  <TextInput
                    style={styles.input}
                    value={formData.location}
                    onChangeText={(text) => setFormData({...formData, location: text})}
                    placeholder="City, State"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            </>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password *</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#9CA3AF" strokeWidth={2} />
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
                placeholder="Create a strong password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#9CA3AF" strokeWidth={2} />
                ) : (
                  <Eye size={20} color="#9CA3AF" strokeWidth={2} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password *</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#9CA3AF" strokeWidth={2} />
              <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#9CA3AF" strokeWidth={2} />
                ) : (
                  <Eye size={20} color="#9CA3AF" strokeWidth={2} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Privacy */}
          <Text style={styles.termsText}>
            By creating an account, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>

          {/* Sign Up Button */}
          <TouchableOpacity 
            style={[styles.signUpButton, loading && styles.signUpButtonDisabled]} 
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.signUpButtonText}>
              {loading ? 'Creating Account...' : 
               accountType === 'business' ? 'Create Business Account' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <TouchableOpacity 
            style={styles.signInContainer}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.signInText}>
              Already have an account? <Text style={styles.signInLink}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingBottom: 32,
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
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#F43F5E',
  },
  placeholder: {
    width: 40,
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#111827',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  accountTypeContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#F43F5E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B7280',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  form: {
    paddingHorizontal: 20,
  },
  businessSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
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
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  link: {
    color: '#F43F5E',
    fontFamily: 'Inter-SemiBold',
  },
  signUpButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  signUpButtonDisabled: {
    opacity: 0.6,
  },
  signUpButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  signInContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  signInText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  signInLink: {
    color: '#F43F5E',
    fontFamily: 'Inter-SemiBold',
  },
});