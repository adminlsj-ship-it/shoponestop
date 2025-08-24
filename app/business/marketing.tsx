import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Mail, 
  Instagram, 
  Facebook,
  Plus,
  Eye,
  Heart,
  Share,
  Calendar
} from 'lucide-react-native';

const campaigns = [
  {
    id: '1',
    title: 'Holiday Special - 20% Off',
    type: 'Promotion',
    status: 'Active',
    reach: 1240,
    engagement: 89,
    bookings: 12,
    startDate: '2024-12-01',
    endDate: '2024-12-31',
  },
  {
    id: '2',
    title: 'New Client Welcome Package',
    type: 'Welcome Series',
    status: 'Active',
    reach: 856,
    engagement: 67,
    bookings: 8,
    startDate: '2024-11-15',
    endDate: 'Ongoing',
  },
];

const socialPosts = [
  {
    id: '1',
    platform: 'Instagram',
    content: 'Transform your look with our premium hair styling services! ✨',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 124,
    comments: 18,
    shares: 7,
    posted: '2 hours ago',
  },
  {
    id: '2',
    platform: 'Facebook',
    content: 'Book your appointment today and get 15% off your first visit!',
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 89,
    comments: 12,
    shares: 15,
    posted: '1 day ago',
  },
];

export default function MarketingScreen() {
  const [selectedTab, setSelectedTab] = useState('campaigns');

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
        <Text style={styles.title}>Marketing Suite</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'campaigns' && styles.activeTab]}
          onPress={() => setSelectedTab('campaigns')}
        >
          <Text style={[styles.tabText, selectedTab === 'campaigns' && styles.activeTabText]}>
            Campaigns
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'social' && styles.activeTab]}
          onPress={() => setSelectedTab('social')}
        >
          <Text style={[styles.tabText, selectedTab === 'social' && styles.activeTabText]}>
            Social Media
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'email' && styles.activeTab]}
          onPress={() => setSelectedTab('email')}
        >
          <Text style={[styles.tabText, selectedTab === 'email' && styles.activeTabText]}>
            Email
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Marketing Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <TrendingUp size={20} color="#10B981" strokeWidth={2} />
            <Text style={styles.statNumber}>2,156</Text>
            <Text style={styles.statLabel}>Total Reach</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={20} color="#8B5CF6" strokeWidth={2} />
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Engagement</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={20} color="#F43F5E" strokeWidth={2} />
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
        </View>

        {selectedTab === 'campaigns' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Campaigns</Text>
            {campaigns.map((campaign) => (
              <View key={campaign.id} style={styles.campaignCard}>
                <View style={styles.campaignHeader}>
                  <Text style={styles.campaignTitle}>{campaign.title}</Text>
                  <View style={[
                    styles.statusBadge,
                    campaign.status === 'Active' && styles.activeBadge
                  ]}>
                    <Text style={[
                      styles.statusText,
                      campaign.status === 'Active' && styles.activeText
                    ]}>
                      {campaign.status}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.campaignType}>{campaign.type}</Text>
                
                <View style={styles.campaignStats}>
                  <View style={styles.campaignStat}>
                    <Text style={styles.campaignStatNumber}>{campaign.reach}</Text>
                    <Text style={styles.campaignStatLabel}>Reach</Text>
                  </View>
                  <View style={styles.campaignStat}>
                    <Text style={styles.campaignStatNumber}>{campaign.engagement}</Text>
                    <Text style={styles.campaignStatLabel}>Engagement</Text>
                  </View>
                  <View style={styles.campaignStat}>
                    <Text style={styles.campaignStatNumber}>{campaign.bookings}</Text>
                    <Text style={styles.campaignStatLabel}>Bookings</Text>
                  </View>
                </View>
                
                <Text style={styles.campaignDates}>
                  {campaign.startDate} - {campaign.endDate}
                </Text>
              </View>
            ))}
            
            <TouchableOpacity style={styles.createButton}>
              <Plus size={20} color="#F43F5E" strokeWidth={2} />
              <Text style={styles.createButtonText}>Create New Campaign</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedTab === 'social' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Posts</Text>
            {socialPosts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.platformContainer}>
                    {post.platform === 'Instagram' ? (
                      <Instagram size={20} color="#E4405F" strokeWidth={2} />
                    ) : (
                      <Facebook size={20} color="#1877F2" strokeWidth={2} />
                    )}
                    <Text style={styles.platformText}>{post.platform}</Text>
                  </View>
                  <Text style={styles.postTime}>{post.posted}</Text>
                </View>
                
                <Text style={styles.postContent}>{post.content}</Text>
                
                <Image source={{ uri: post.image }} style={styles.postImage} />
                
                <View style={styles.postStats}>
                  <View style={styles.postStat}>
                    <Heart size={16} color="#EF4444" strokeWidth={2} />
                    <Text style={styles.postStatText}>{post.likes}</Text>
                  </View>
                  <View style={styles.postStat}>
                    <MessageSquare size={16} color="#6B7280" strokeWidth={2} />
                    <Text style={styles.postStatText}>{post.comments}</Text>
                  </View>
                  <View style={styles.postStat}>
                    <Share size={16} color="#6B7280" strokeWidth={2} />
                    <Text style={styles.postStatText}>{post.shares}</Text>
                  </View>
                </View>
              </View>
            ))}
            
            <TouchableOpacity style={styles.createButton}>
              <Plus size={20} color="#F43F5E" strokeWidth={2} />
              <Text style={styles.createButtonText}>Create New Post</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedTab === 'email' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Email Marketing</Text>
            
            <View style={styles.emailCard}>
              <Mail size={24} color="#8B5CF6" strokeWidth={2} />
              <Text style={styles.emailTitle}>Newsletter Campaign</Text>
              <Text style={styles.emailDescription}>
                Send monthly newsletters to your clients with special offers and updates
              </Text>
              <TouchableOpacity style={styles.emailButton}>
                <Text style={styles.emailButtonText}>Create Newsletter</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.emailCard}>
              <Calendar size={24} color="#10B981" strokeWidth={2} />
              <Text style={styles.emailTitle}>Appointment Reminders</Text>
              <Text style={styles.emailDescription}>
                Automated email reminders sent 24 hours before appointments
              </Text>
              <TouchableOpacity style={styles.emailButton}>
                <Text style={styles.emailButtonText}>Configure Reminders</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.emailCard}>
              <Users size={24} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.emailTitle}>Client Follow-up</Text>
              <Text style={styles.emailDescription}>
                Thank you emails and feedback requests after appointments
              </Text>
              <TouchableOpacity style={styles.emailButton}>
                <Text style={styles.emailButtonText}>Set Up Follow-up</Text>
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
  addButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  campaignCard: {
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
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  campaignTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  activeBadge: {
    backgroundColor: '#DCFCE7',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  activeText: {
    color: '#166534',
  },
  campaignType: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8B5CF6',
    marginBottom: 16,
  },
  campaignStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  campaignStat: {
    alignItems: 'center',
  },
  campaignStatNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  campaignStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  campaignDates: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  createButton: {
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
  },
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F43F5E',
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  platformText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  postTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  postContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    gap: 20,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postStatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  emailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  emailTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
  },
  emailDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  emailButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emailButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});