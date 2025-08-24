import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Sparkles, Users, Calendar } from 'lucide-react-native';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F43F5E', '#8B5CF6']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Sparkles size={32} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.logo}>BeautyBook</Text>
          </View>
          <Text style={styles.tagline}>Beauty services & products, all in one place</Text>
        </View>

        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
          />
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Calendar size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.featureText}>Book instantly</Text>
          </View>
          <View style={styles.feature}>
            <Users size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.featureText}>Trusted professionals</Text>
          </View>
          <View style={styles.feature}>
            <Sparkles size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.featureText}>Premium products</Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/auth/signup')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Business CTA */}
        <TouchableOpacity style={styles.businessCta}>
          <Text style={styles.businessCtaText}>
            Are you a beauty professional? <Text style={styles.businessCtaLink}>Join as Business</Text>
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  logo: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroImage: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  featuresContainer: {
    marginBottom: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  featureText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  ctaContainer: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#F43F5E',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  businessCta: {
    alignItems: 'center',
    marginBottom: 20,
  },
  businessCtaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  businessCtaLink: {
    fontFamily: 'Inter-SemiBold',
    textDecorationLine: 'underline',
  },
});