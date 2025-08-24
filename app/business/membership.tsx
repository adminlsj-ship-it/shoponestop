import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Crown, Check, Star, TrendingUp, Users, Zap } from 'lucide-react-native';
import { useStripe } from '@/hooks/useStripe';
import { stripeProducts } from '@/src/stripe-config';


export default function MembershipScreen() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const { subscription, loading, createCheckoutSession, getCurrentPlan, isSubscriptionActive } = useStripe();

  const currentPlan = getCurrentPlan();

  const membershipPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Up to 5 services',
        'Basic booking calendar',
        'Customer messaging',
        'Payment processing',
        'Basic analytics',
      ],
      current: currentPlan.name === 'Basic',
      priceId: null,
    },
    ...stripeProducts.map(product => ({
      id: product.id,
      name: product.name,
      price: `$${product.price}/month`,
      description: product.description,
      features: product.description.split(', '),
      current: currentPlan.name === product.name,
      popular: product.name === 'PRO PLAN',
      priceId: product.priceId,
    })),
  ];

  const handleUpgrade = async (priceId: string) => {
    if (!priceId) return;
    
    try {
      await createCheckoutSession(priceId, 'subscription');
    } catch (error) {
      console.error('Failed to start checkout:', error);
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
          <Text style={styles.title}>Membership Plans</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Benefits Overview */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Unlock Your Business Potential with Pro</Text>
          <Text style={styles.benefitsDescription}>
            Join thousands of beauty professionals who have grown their business with BeautyBook Pro membership
          </Text>
          
          <View style={styles.benefitsGrid}>
            <View style={styles.benefitItem}>
              <TrendingUp size={24} color="#10B981" strokeWidth={2} />
              <Text style={styles.benefitText}>Increase bookings by 40%</Text>
            </View>
            <View style={styles.benefitItem}>
              <Users size={24} color="#8B5CF6" strokeWidth={2} />
              <Text style={styles.benefitText}>Retain more customers</Text>
            </View>
            <View style={styles.benefitItem}>
              <Zap size={24} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.benefitText}>Automate operations</Text>
            </View>
            <View style={styles.benefitItem}>
              <Star size={24} color="#F43F5E" strokeWidth={2} />
              <Text style={styles.benefitText}>Premium support</Text>
            </View>
          </View>
        </View>

        {/* Membership Plans */}
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          
          {membershipPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.planCardSelected,
                plan.popular && styles.planCardPopular,
                plan.current && styles.planCardCurrent,
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Crown size={16} color="#FFFFFF" strokeWidth={2} />
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}
              
              {plan.current && (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentText}>Current Plan</Text>
                </View>
              )}
              
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planDescription}>{plan.description}</Text>
              </View>
              
              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Check size={16} color="#10B981" strokeWidth={2} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              {!plan.current && plan.priceId && (
                <TouchableOpacity style={[
                  styles.selectButton,
                  selectedPlan === plan.id && styles.selectButtonSelected,
                ]}
                onPress={() => handleUpgrade(plan.priceId!)}
                disabled={loading}
                >
                  <Text style={[
                    styles.selectButtonText,
                    selectedPlan === plan.id && styles.selectButtonTextSelected,
                  ]}>
                    {loading ? 'Loading...' : 'Upgrade Now'}
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What's included in the Pro membership?</Text>
            <Text style={styles.faqAnswer}>
              Pro membership includes advanced marketing features, automatic enrollment in New Client Deliveries, reduced 3.00% credit card processing rate, and priority support for $26.99/month.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What's the product sales add-on?</Text>
            <Text style={styles.faqAnswer}>
              For an additional $15.99/month, you get full product sales integration, inventory management, and e-commerce features to sell beauty products directly through your profile.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What's the Product Pro plan?</Text>
            <Text style={styles.faqAnswer}>
              Product Pro at $32.99/month is designed for businesses focused primarily on product sales. It includes unlimited listings, advanced tools, advertising options, and no sales volume restrictions.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How does the Individual Seller plan work?</Text>
            <Text style={styles.faqAnswer}>
              Pay only $0.99 per item sold with no monthly fee. You must sell at least 10 items per month to stay active. If you don't meet the minimum, your store will be deactivated for 30 days.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What are New Client Deliveries?</Text>
            <Text style={styles.faqAnswer}>
              Our automated marketing system that delivers targeted promotions and your business information to potential new clients in your area.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I cancel anytime?</Text>
            <Text style={styles.faqAnswer}>
              Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What's included in the free trial?</Text>
            <Text style={styles.faqAnswer}>
              You get full access to all Pro features for 14 days, including marketing automation and reduced processing rates.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How does billing work?</Text>
            <Text style={styles.faqAnswer}>
              Premium is $29.99/month. Product sales add-on is $15.99/month. Product Pro is $32.99/month for unlimited product sales. Individual Seller is $0.99 per item sold with 10 item minimum monthly.
            </Text>
          </View>
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
  benefitsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  benefitsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  benefitsDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  benefitItem: {
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
  benefitText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginTop: 8,
  },
  plansSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#F43F5E',
  },
  planCardPopular: {
    borderColor: '#F59E0B',
  },
  planCardCurrent: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    right: 20,
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  popularText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  currentBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    right: 20,
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  currentText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  planHeader: {
    marginBottom: 16,
    marginTop: 16,
  },
  planName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 8,
  },
  planPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#F43F5E',
    marginBottom: 8,
  },
  planDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  planFeatures: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  selectButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  selectButtonSelected: {
    backgroundColor: '#F43F5E',
  },
  selectButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B7280',
  },
  selectButtonTextSelected: {
    color: '#FFFFFF',
  },
  faqSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  faqQuestion: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
  },
  faqAnswer: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});