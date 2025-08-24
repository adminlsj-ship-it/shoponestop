import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Mail, Phone, MessageCircle, Book, Video, Search, ChevronRight, ExternalLink, CircleHelp as HelpCircle } from 'lucide-react-native';

const faqItems = [
  {
    id: '1',
    question: 'How do I set up my business profile?',
    answer: 'Go to Profile > Business Settings to complete your business information, add photos, and set your availability.',
    category: 'Getting Started',
  },
  {
    id: '2',
    question: 'How do I manage my calendar and availability?',
    answer: 'Use the Calendar tab to set your working hours, block time off, and manage appointments.',
    category: 'Calendar',
  },
  {
    id: '3',
    question: 'What are the payment processing fees?',
    answer: 'Standard processing fees are 2.9% + $0.30 per transaction. Premium members get reduced rates.',
    category: 'Payments',
  },
  {
    id: '4',
    question: 'How do I handle no-shows and cancellations?',
    answer: 'Set up your policies in Payments & Policies. You can charge fees for no-shows and late cancellations.',
    category: 'Policies',
  },
  {
    id: '5',
    question: 'Can I add multiple services?',
    answer: 'Yes! Go to Services to add unlimited services with different prices and durations.',
    category: 'Services',
  },
];

const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Set up your business profile and start taking bookings',
    icon: '🚀',
  },
  {
    id: 'calendar',
    title: 'Calendar & Scheduling',
    description: 'Manage your availability and appointments',
    icon: '📅',
  },
  {
    id: 'payments',
    title: 'Payments & Fees',
    description: 'Understanding payment processing and fees',
    icon: '💳',
  },
  {
    id: 'marketing',
    title: 'Marketing Tools',
    description: 'Promote your business and attract clients',
    icon: '📢',
  },
  {
    id: 'policies',
    title: 'Business Policies',
    description: 'Set up cancellation and no-show policies',
    icon: '📋',
  },
];

export default function HelpScreen() {
  const [selectedTab, setSelectedTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'normal',
  });

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmailSupport = () => {
    const email = 'support@shoponestop.net';
    const subject = contactForm.subject || 'Support Request';
    const body = contactForm.message || 'Please describe your issue...';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert('Error', 'Unable to open email client. Please email us directly at support@shoponestop.net');
    });
  };

  const handlePhoneSupport = () => {
    const phoneNumber = '+1-555-SHOP-ONE';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert('Error', 'Unable to make phone call');
    });
  };

  const handleLiveChat = () => {
    Alert.alert('Live Chat', 'ShopOneStop live chat coming soon! Please use email support for now.');
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
        <Text style={styles.title}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'faq' && styles.activeTab]}
          onPress={() => setSelectedTab('faq')}
        >
          <Text style={[styles.tabText, selectedTab === 'faq' && styles.activeTabText]}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'guides' && styles.activeTab]}
          onPress={() => setSelectedTab('guides')}
        >
          <Text style={[styles.tabText, selectedTab === 'guides' && styles.activeTabText]}>
            Guides
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'contact' && styles.activeTab]}
          onPress={() => setSelectedTab('contact')}
        >
          <Text style={[styles.tabText, selectedTab === 'contact' && styles.activeTabText]}>
            Contact
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedTab === 'faq' && (
          <View style={styles.section}>
            {/* Search */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Search size={20} color="#6B7280" strokeWidth={2} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* FAQ Items */}
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            {filteredFAQ.map((item) => (
              <View key={item.id} style={styles.faqCard}>
                <View style={styles.faqHeader}>
                  <HelpCircle size={20} color="#F43F5E" strokeWidth={2} />
                  <Text style={styles.faqQuestion}>{item.question}</Text>
                </View>
                <Text style={styles.faqAnswer}>{item.answer}</Text>
                <Text style={styles.faqCategory}>{item.category}</Text>
              </View>
            ))}
          </View>
        )}

        {selectedTab === 'guides' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Help Categories</Text>
            {helpCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
            ))}

            {/* Video Tutorials */}
            <View style={styles.tutorialsSection}>
              <Text style={styles.sectionTitle}>Video Tutorials</Text>
              
              <TouchableOpacity style={styles.tutorialCard}>
                <Video size={24} color="#F43F5E" strokeWidth={2} />
                <View style={styles.tutorialInfo}>
                  <Text style={styles.tutorialTitle}>Getting Started with BeautyBook</Text>
                  <Text style={styles.tutorialDuration}>5 min tutorial</Text>
                </View>
                <ExternalLink size={16} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.tutorialCard}>
                <Video size={24} color="#F43F5E" strokeWidth={2} />
                <View style={styles.tutorialInfo}>
                  <Text style={styles.tutorialTitle}>Setting Up Your Services</Text>
                  <Text style={styles.tutorialDuration}>3 min tutorial</Text>
                </View>
                <ExternalLink size={16} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.tutorialCard}>
                <Video size={24} color="#F43F5E" strokeWidth={2} />
                <View style={styles.tutorialInfo}>
                  <Text style={styles.tutorialTitle}>Managing Your Calendar</Text>
                  <Text style={styles.tutorialDuration}>4 min tutorial</Text>
                </View>
                <ExternalLink size={16} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {selectedTab === 'contact' && (
          <View style={styles.section}>
            {/* Contact Options */}
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            
            <TouchableOpacity style={styles.contactCard} onPress={handleEmailSupport}>
              <Mail size={24} color="#F43F5E" strokeWidth={2} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Email Support</Text>
                <Text style={styles.contactDescription}>
                  Get help via email - we typically respond within 24 hours
                </Text>
                <Text style={styles.contactDetail}>support@shoponestop.net</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactCard} onPress={handlePhoneSupport}>
              <Phone size={24} color="#10B981" strokeWidth={2} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Phone Support</Text>
                <Text style={styles.contactDescription}>
                  Speak with our support team Monday-Friday, 9AM-6PM EST
                </Text>
                <Text style={styles.contactDetail}>+1 (555) SHOP-ONE</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactCard} onPress={handleLiveChat}>
              <MessageCircle size={24} color="#8B5CF6" strokeWidth={2} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Live Chat</Text>
                <Text style={styles.contactDescription}>
                  Chat with our support team in real-time
                </Text>
                <Text style={styles.contactDetail}>Available 9AM-6PM EST</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>

            {/* Contact Form */}
            <View style={styles.contactForm}>
              <Text style={styles.sectionTitle}>Send us a Message</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Subject</Text>
                <TextInput
                  style={styles.input}
                  value={contactForm.subject}
                  onChangeText={(text) => setContactForm({...contactForm, subject: text})}
                  placeholder="Brief description of your issue"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Message</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={contactForm.message}
                  onChangeText={(text) => setContactForm({...contactForm, message: text})}
                  placeholder="Please provide details about your issue or question..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={4}
                />
              </View>
              
              <TouchableOpacity style={styles.sendButton} onPress={handleEmailSupport}>
                <Mail size={20} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.sendButtonText}>Send Email</Text>
              </TouchableOpacity>
            </View>

            {/* Additional Resources */}
            <View style={styles.resourcesSection}>
              <Text style={styles.sectionTitle}>Additional Resources</Text>
              
              <TouchableOpacity style={styles.resourceCard}>
                <Book size={20} color="#6B7280" strokeWidth={2} />
                <Text style={styles.resourceText}>Knowledge Base</Text>
                <ExternalLink size={16} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceCard}>
                <MessageCircle size={20} color="#6B7280" strokeWidth={2} />
                <Text style={styles.resourceText}>Community Forum</Text>
                <ExternalLink size={16} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
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
  placeholder: {
    width: 40,
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
  searchContainer: {
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  faqCard: {
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
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  faqQuestion: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    flex: 1,
    lineHeight: 22,
  },
  faqAnswer: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  faqCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  categoryDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  tutorialsSection: {
    marginTop: 32,
  },
  tutorialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tutorialInfo: {
    flex: 1,
    marginLeft: 16,
  },
  tutorialTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  tutorialDuration: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  contactDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
  },
  contactDetail: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#F43F5E',
  },
  contactForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
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
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  sendButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  resourcesSection: {
    marginTop: 32,
  },
  resourceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
});