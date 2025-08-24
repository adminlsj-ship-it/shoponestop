import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Plus, Percent, Calendar, Users, TrendingUp, CreditCard as Edit, Trash2, Copy, Share } from 'lucide-react-native';

const promotions = [
  {
    id: '1',
    title: 'Holiday Special',
    description: '20% off all hair services',
    type: 'percentage',
    value: 20,
    code: 'HOLIDAY20',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    usageLimit: 100,
    usedCount: 23,
    status: 'active',
    applicableServices: ['Hair Cut', 'Hair Color', 'Hair Styling'],
  },
  {
    id: '2',
    title: 'New Client Welcome',
    description: '$25 off first appointment',
    type: 'fixed',
    value: 25,
    code: 'WELCOME25',
    startDate: '2024-11-01',
    endDate: '2025-01-31',
    usageLimit: 50,
    usedCount: 12,
    status: 'active',
    applicableServices: ['All Services'],
  },
  {
    id: '3',
    title: 'Referral Bonus',
    description: '15% off when you refer a friend',
    type: 'percentage',
    value: 15,
    code: 'REFER15',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    usageLimit: null,
    usedCount: 8,
    status: 'active',
    applicableServices: ['All Services'],
  },
];

export default function PromotionsScreen() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    title: '',
    description: '',
    type: 'percentage',
    value: '',
    code: '',
    startDate: '',
    endDate: '',
    usageLimit: '',
    applicableServices: 'All Services',
  });

  const handleCreatePromotion = () => {
    if (!newPromotion.title || !newPromotion.value || !newPromotion.code) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert('Success', 'Promotion created successfully!');
    setShowCreateForm(false);
    setNewPromotion({
      title: '',
      description: '',
      type: 'percentage',
      value: '',
      code: '',
      startDate: '',
      endDate: '',
      usageLimit: '',
      applicableServices: 'All Services',
    });
  };

  const handleEditPromotion = (promotionId: string) => {
    Alert.alert('Edit Promotion', 'Promotion editing feature coming soon!');
  };

  const handleDeletePromotion = (promotionId: string) => {
    Alert.alert(
      'Delete Promotion',
      'Are you sure you want to delete this promotion?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          Alert.alert('Success', 'Promotion deleted successfully!');
        }},
      ]
    );
  };

  const handleCopyCode = (code: string) => {
    Alert.alert('Copied!', `Promotion code "${code}" copied to clipboard`);
  };

  const handleSharePromotion = (promotion: any) => {
    Alert.alert('Share Promotion', `Sharing "${promotion.title}" promotion...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'expired': return '#EF4444';
      case 'scheduled': return '#F59E0B';
      default: return '#6B7280';
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
          <Text style={styles.title}>Promotions & Offers</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowCreateForm(!showCreateForm)}
          >
            <Plus size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Percent size={20} color="#F43F5E" strokeWidth={2} />
            <Text style={styles.statNumber}>{promotions.filter(p => p.status === 'active').length}</Text>
            <Text style={styles.statLabel}>Active Offers</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={20} color="#10B981" strokeWidth={2} />
            <Text style={styles.statNumber}>{promotions.reduce((sum, p) => sum + p.usedCount, 0)}</Text>
            <Text style={styles.statLabel}>Total Uses</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={20} color="#8B5CF6" strokeWidth={2} />
            <Text style={styles.statNumber}>$1,240</Text>
            <Text style={styles.statLabel}>Revenue Impact</Text>
          </View>
        </View>

        {/* Create Promotion Form */}
        {showCreateForm && (
          <View style={styles.createForm}>
            <Text style={styles.formTitle}>Create New Promotion</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Promotion Title *</Text>
              <TextInput
                style={styles.input}
                value={newPromotion.title}
                onChangeText={(text) => setNewPromotion({...newPromotion, title: text})}
                placeholder="e.g., Summer Special"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newPromotion.description}
                onChangeText={(text) => setNewPromotion({...newPromotion, description: text})}
                placeholder="Describe your promotion..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Discount Type *</Text>
                <View style={styles.typeSelector}>
                  <TouchableOpacity
                    style={[styles.typeButton, newPromotion.type === 'percentage' && styles.typeButtonActive]}
                    onPress={() => setNewPromotion({...newPromotion, type: 'percentage'})}
                  >
                    <Text style={[styles.typeButtonText, newPromotion.type === 'percentage' && styles.typeButtonTextActive]}>
                      %
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.typeButton, newPromotion.type === 'fixed' && styles.typeButtonActive]}
                    onPress={() => setNewPromotion({...newPromotion, type: 'fixed'})}
                  >
                    <Text style={[styles.typeButtonText, newPromotion.type === 'fixed' && styles.typeButtonTextActive]}>
                      $
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Value *</Text>
                <TextInput
                  style={styles.input}
                  value={newPromotion.value}
                  onChangeText={(text) => setNewPromotion({...newPromotion, value: text})}
                  placeholder={newPromotion.type === 'percentage' ? '20' : '25'}
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Promotion Code *</Text>
              <TextInput
                style={styles.input}
                value={newPromotion.code}
                onChangeText={(text) => setNewPromotion({...newPromotion, code: text.toUpperCase()})}
                placeholder="SUMMER20"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Start Date</Text>
                <TextInput
                  style={styles.input}
                  value={newPromotion.startDate}
                  onChangeText={(text) => setNewPromotion({...newPromotion, startDate: text})}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>End Date</Text>
                <TextInput
                  style={styles.input}
                  value={newPromotion.endDate}
                  onChangeText={(text) => setNewPromotion({...newPromotion, endDate: text})}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Usage Limit (Optional)</Text>
              <TextInput
                style={styles.input}
                value={newPromotion.usageLimit}
                onChangeText={(text) => setNewPromotion({...newPromotion, usageLimit: text})}
                placeholder="Leave empty for unlimited"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity 
                style={styles.cancelFormButton}
                onPress={() => setShowCreateForm(false)}
              >
                <Text style={styles.cancelFormButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createButton} onPress={handleCreatePromotion}>
                <Text style={styles.createButtonText}>Create Promotion</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Promotions List */}
        <View style={styles.promotionsContainer}>
          <Text style={styles.sectionTitle}>Your Promotions</Text>
          
          {promotions.map((promotion) => (
            <View key={promotion.id} style={styles.promotionCard}>
              <View style={styles.promotionHeader}>
                <View style={styles.promotionTitleRow}>
                  <Text style={styles.promotionTitle}>{promotion.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(promotion.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(promotion.status) }]}>
                      {promotion.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.promotionDescription}>{promotion.description}</Text>
              </View>
              
              <View style={styles.promotionDetails}>
                <View style={styles.promotionValue}>
                  <Text style={styles.valueText}>
                    {promotion.type === 'percentage' ? `${promotion.value}%` : `$${promotion.value}`} OFF
                  </Text>
                </View>
                
                <View style={styles.promotionCode}>
                  <Text style={styles.codeLabel}>Code:</Text>
                  <Text style={styles.codeText}>{promotion.code}</Text>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => handleCopyCode(promotion.code)}
                  >
                    <Copy size={14} color="#6B7280" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.promotionStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statItemLabel}>Used</Text>
                  <Text style={styles.statItemValue}>
                    {promotion.usedCount}{promotion.usageLimit ? `/${promotion.usageLimit}` : ''}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemLabel}>Valid Until</Text>
                  <Text style={styles.statItemValue}>{promotion.endDate}</Text>
                </View>
              </View>
              
              <View style={styles.promotionActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleEditPromotion(promotion.id)}
                >
                  <Edit size={16} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleSharePromotion(promotion)}
                >
                  <Share size={16} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.deleteActionButton}
                  onPress={() => handleDeletePromotion(promotion.id)}
                >
                  <Trash2 size={16} color="#EF4444" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Promotion Templates */}
        <View style={styles.templatesSection}>
          <Text style={styles.sectionTitle}>Quick Templates</Text>
          
          <TouchableOpacity style={styles.templateCard}>
            <Text style={styles.templateTitle}>First-Time Client</Text>
            <Text style={styles.templateDescription}>20% off first appointment</Text>
            <Text style={styles.templateAction}>Use Template</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.templateCard}>
            <Text style={styles.templateTitle}>Loyalty Reward</Text>
            <Text style={styles.templateDescription}>$10 off after 5 visits</Text>
            <Text style={styles.templateAction}>Use Template</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.templateCard}>
            <Text style={styles.templateTitle}>Seasonal Special</Text>
            <Text style={styles.templateDescription}>15% off holiday services</Text>
            <Text style={styles.templateAction}>Use Template</Text>
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  createForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    margin: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  formTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 20,
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
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#F43F5E',
  },
  typeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B7280',
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelFormButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelFormButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B7280',
  },
  createButton: {
    flex: 1,
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  promotionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  promotionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  promotionHeader: {
    marginBottom: 16,
  },
  promotionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  promotionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  promotionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  promotionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  promotionValue: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  valueText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#F43F5E',
  },
  promotionCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  codeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  codeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#111827',
  },
  copyButton: {
    padding: 4,
  },
  promotionStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statItem: {
    alignItems: 'center',
  },
  statItemLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  statItemValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  promotionActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  deleteActionButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  templatesSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
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
});