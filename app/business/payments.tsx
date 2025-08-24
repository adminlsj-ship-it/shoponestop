import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, CreditCard, DollarSign, Clock, CircleAlert as AlertCircle, Settings, Plus, Check, X } from 'lucide-react-native';

const paymentMethods = [
  {
    id: '1',
    type: 'Credit Card',
    provider: 'Stripe',
    fee: '2.9% + $0.30',
    enabled: true,
    icon: '💳',
  },
  {
    id: '2',
    type: 'Apple Pay',
    provider: 'Apple',
    fee: '2.9% + $0.30',
    enabled: true,
    icon: '📱',
  },
  {
    id: '3',
    type: 'Google Pay',
    provider: 'Google',
    fee: '2.9% + $0.30',
    enabled: false,
    icon: '📱',
  },
  {
    id: '4',
    type: 'Cash',
    provider: 'In-person',
    fee: 'Free',
    enabled: true,
    icon: '💵',
  },
];

const policies = [
  {
    id: 'noShow',
    title: 'No-Show Policy',
    description: 'Charge clients who miss appointments without notice',
    enabled: true,
    feeType: 'fixed',
    feeAmount: 50,
    feePercentage: 0,
  },
  {
    id: 'lateCancellation',
    title: 'Late Cancellation Policy',
    description: 'Charge for cancellations within specified time window',
    enabled: true,
    feeType: 'fixed',
    feeAmount: 25,
    feePercentage: 0,
    timeWindow: 12,
  },
  {
    id: 'deposit',
    title: 'Booking Deposit',
    description: 'Require deposit for new clients or premium services',
    enabled: false,
    feeType: 'percentage',
    feeAmount: 0,
    feePercentage: 30,
  },
  {
    id: 'rescheduling',
    title: 'Rescheduling Policy',
    description: 'Allow clients to reschedule appointments with conditions',
    enabled: true,
    freeReschedules: 1,
    rescheduleWindow: 24,
    feeAfterLimit: true,
    feeType: 'fixed',
    feeAmount: 15,
    feePercentage: 0,
  },
];

export default function PaymentsScreen() {
  const [selectedTab, setSelectedTab] = useState('methods');
  const [paymentSettings, setPaymentSettings] = useState(paymentMethods);
  const [policySettings, setPolicySettings] = useState(policies);

  const togglePaymentMethod = (id: string) => {
    setPaymentSettings(prev => 
      prev.map(method => 
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  const togglePolicy = (id: string) => {
    setPolicySettings(prev => 
      prev.map(policy => 
        policy.id === id ? { ...policy, enabled: !policy.enabled } : policy
      )
    );
  };

  const handleEditPolicy = (policyId: string) => {
    const policy = policySettings.find(p => p.id === policyId);
    if (!policy) return;
    
    Alert.alert(
      'Edit Policy',
      `Configure ${policy.title}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Edit Settings', onPress: () => openPolicyEditor(policyId) },
      ]
    );
  };

  const openPolicyEditor = (policyId: string) => {
    // This would open a modal or navigate to policy editor
    Alert.alert('Policy Editor', 'Advanced policy editor coming soon!');
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
        <Text style={styles.title}>Payments & Policies</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'methods' && styles.activeTab]}
          onPress={() => setSelectedTab('methods')}
        >
          <Text style={[styles.tabText, selectedTab === 'methods' && styles.activeTabText]}>
            Payment Methods
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'policies' && styles.activeTab]}
          onPress={() => setSelectedTab('policies')}
        >
          <Text style={[styles.tabText, selectedTab === 'policies' && styles.activeTabText]}>
            Policies
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedTab === 'methods' && (
          <View style={styles.section}>
            {/* Payment Overview */}
            <View style={styles.overviewCard}>
              <Text style={styles.overviewTitle}>Payment Processing</Text>
              <Text style={styles.overviewDescription}>
                Accept payments securely and get paid faster with multiple payment options
              </Text>
              
              <View style={styles.overviewStats}>
                <View style={styles.overviewStat}>
                  <DollarSign size={20} color="#10B981" strokeWidth={2} />
                  <Text style={styles.overviewStatNumber}>$7,240</Text>
                  <Text style={styles.overviewStatLabel}>This Month</Text>
                </View>
                <View style={styles.overviewStat}>
                  <CreditCard size={20} color="#8B5CF6" strokeWidth={2} />
                  <Text style={styles.overviewStatNumber}>89%</Text>
                  <Text style={styles.overviewStatLabel}>Card Payments</Text>
                </View>
              </View>
            </View>

            {/* Payment Methods */}
            <Text style={styles.sectionTitle}>Accepted Payment Methods</Text>
            {paymentSettings.map((method) => (
              <View key={method.id} style={styles.paymentMethodCard}>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodIcon}>{method.icon}</Text>
                  <View style={styles.methodDetails}>
                    <Text style={styles.methodType}>{method.type}</Text>
                    <Text style={styles.methodProvider}>via {method.provider}</Text>
                    <Text style={styles.methodFee}>Fee: {method.fee}</Text>
                  </View>
                </View>
                
                <Switch
                  value={method.enabled}
                  onValueChange={() => togglePaymentMethod(method.id)}
                  trackColor={{ false: '#E5E7EB', true: '#F43F5E' }}
                  thumbColor={method.enabled ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>
            ))}

            <TouchableOpacity style={styles.addMethodButton}>
              <Plus size={20} color="#F43F5E" strokeWidth={2} />
              <Text style={styles.addMethodText}>Add Payment Method</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedTab === 'policies' && (
          <View style={styles.section}>
            {/* Policies Overview */}
            <View style={styles.overviewCard}>
              <Text style={styles.overviewTitle}>Business Policies</Text>
              <Text style={styles.overviewDescription}>
                Protect your business with clear policies for no-shows, cancellations, and deposits
              </Text>
            </View>

            {/* Policy Settings */}
            <Text style={styles.sectionTitle}>Policy Settings</Text>
            {policySettings.map((policy) => (
              <View key={policy.id} style={styles.policyCard}>
                <View style={styles.policyHeader}>
                  <View style={styles.policyInfo}>
                    <Text style={styles.policyTitle}>{policy.title}</Text>
                    <Text style={styles.policyDescription}>{policy.description}</Text>
                  </View>
                  <Switch
                    value={policy.enabled}
                    onValueChange={() => togglePolicy(policy.id)}
                    trackColor={{ false: '#E5E7EB', true: '#F43F5E' }}
                    thumbColor={policy.enabled ? '#FFFFFF' : '#FFFFFF'}
                  />
                </View>
                
                {policy.enabled && (
                  <View style={styles.policyDetails}>
                    {policy.feeType && (
                      <View style={styles.policyDetailRow}>
                        <DollarSign size={16} color="#6B7280" strokeWidth={2} />
                        <Text style={styles.policyDetailText}>
                          Fee: {policy.feeType === 'fixed' 
                            ? `$${policy.feeAmount}` 
                            : `${policy.feePercentage}% of service price`}
                        </Text>
                      </View>
                    )}
                    {policy.timeWindow > 0 && (
                      <View style={styles.policyDetailRow}>
                        <Clock size={16} color="#6B7280" strokeWidth={2} />
                        <Text style={styles.policyDetailText}>
                          Time window: {policy.timeWindow} hours
                        </Text>
                      </View>
                    )}
                    {policy.id === 'rescheduling' && policy.enabled && (
                      <>
                        <View style={styles.policyDetailRow}>
                          <Check size={16} color="#10B981" strokeWidth={2} />
                          <Text style={styles.policyDetailText}>
                            {policy.freeReschedules} free reschedule(s) allowed
                          </Text>
                        </View>
                        <View style={styles.policyDetailRow}>
                          <Clock size={16} color="#6B7280" strokeWidth={2} />
                          <Text style={styles.policyDetailText}>
                            Must reschedule {policy.rescheduleWindow}+ hours in advance
                          </Text>
                        </View>
                        {policy.feeAfterLimit && (
                          <View style={styles.policyDetailRow}>
                            <DollarSign size={16} color="#EF4444" strokeWidth={2} />
                            <Text style={styles.policyDetailText}>
                              ${policy.feeAmount} fee after free limit
                            </Text>
                          </View>
                        )}
                      </>
                    )}
                    <TouchableOpacity 
                      style={styles.editPolicyButton}
                      onPress={() => handleEditPolicy(policy.id)}
                    >
                      <Text style={styles.editPolicyText}>Edit Policy</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}

            {/* Policy Templates */}
            <View style={styles.templatesSection}>
              <Text style={styles.sectionTitle}>Policy Templates</Text>
              <Text style={styles.templatesDescription}>
                Use these pre-written policy templates for your business
              </Text>
              
              <TouchableOpacity style={styles.templateCard}>
                <Text style={styles.templateTitle}>Standard Salon Policy</Text>
                <Text style={styles.templateDescription}>
                  24-hour cancellation, $50 no-show fee, 1 free reschedule, $25 late cancellation fee
                </Text>
                <Text style={styles.templateAction}>Apply Template</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.templateCard}>
                <Text style={styles.templateTitle}>Flexible Policy</Text>
                <Text style={styles.templateDescription}>
                  12-hour cancellation, $25 no-show fee, 2 free reschedules, no late fees
                </Text>
                <Text style={styles.templateAction}>Apply Template</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.templateCard}>
                <Text style={styles.templateTitle}>Premium Service Policy</Text>
                <Text style={styles.templateDescription}>
                  48-hour cancellation, $75 no-show fee, 30% deposit, $35 late cancellation
                </Text>
                <Text style={styles.templateAction}>Apply Template</Text>
              </TouchableOpacity>
            </View>

            {/* Policy Preview */}
            <View style={styles.previewSection}>
              <Text style={styles.sectionTitle}>Policy Preview</Text>
              <View style={styles.previewCard}>
                <Text style={styles.previewTitle}>Your Current Policies</Text>
                <Text style={styles.previewText}>
                  • Cancellations must be made at least 12 hours in advance{'\n'}
                  • No-show appointments will be charged $50{'\n'}
                  • Late cancellations (within 12 hours) will be charged $25{'\n'}
                  • 1 free reschedule allowed per booking{'\n'}
                  • Additional reschedules incur a $15 fee{'\n'}
                  • Reschedules must be made 24+ hours in advance{'\n'}
                  • Payment is due at time of service
                </Text>
                <TouchableOpacity style={styles.shareButton}>
                  <Text style={styles.shareButtonText}>Share with Clients</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
  settingsButton: {
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    margin: 20,
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#F43F5E',
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  overviewTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 8,
  },
  overviewDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 20,
  },
  overviewStats: {
    flexDirection: 'row',
    gap: 24,
  },
  overviewStat: {
    alignItems: 'center',
  },
  overviewStatNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  overviewStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  paymentMethodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  methodDetails: {
    flex: 1,
  },
  methodType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  methodProvider: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  methodFee: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  addMethodButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: '#F43F5E',
    borderStyle: 'dashed',
    marginTop: 8,
  },
  addMethodText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F43F5E',
  },
  policyCard: {
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
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  policyInfo: {
    flex: 1,
    marginRight: 16,
  },
  policyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  policyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  policyDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  policyDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  policyDetailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
  },
  editPolicyButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  editPolicyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#6B7280',
  },
  templatesSection: {
    marginTop: 32,
  },
  templatesDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  templateCard: {
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
  templateTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
  },
  templateDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  templateAction: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#F43F5E',
  },
  previewSection: {
    marginTop: 32,
  },
  previewCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  previewTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  previewText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 16,
  },
  shareButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  shareButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});