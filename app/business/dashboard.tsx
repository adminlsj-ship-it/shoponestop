import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  Plus, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Users,
  Star,
  Clock,
  Package,
  Bell
} from 'lucide-react-native';
import { useStripe } from '@/hooks/useStripe';

const todayStats = {
  bookings: 8,
  revenue: 1240,
  newClients: 3,
  rating: 4.9,
};

const recentBookings = [
  {
    id: '1',
    clientName: 'Emma Wilson',
    service: 'Hair Cut & Style',
    time: '2:30 PM',
    status: 'confirmed',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    clientName: 'Sofia Martinez',
    service: 'Professional Makeup',
    time: '4:00 PM',
    status: 'pending',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function BusinessDashboard() {
  const { getCurrentPlan, isSubscriptionActive } = useStripe();
  const currentPlan = getCurrentPlan();

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
          <Text style={styles.title}>Business Dashboard</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#F43F5E" strokeWidth={2} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Calendar size={20} color="#F43F5E" strokeWidth={2} />
              </View>
              <Text style={styles.statNumber}>{todayStats.bookings}</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <DollarSign size={20} color="#10B981" strokeWidth={2} />
              </View>
              <Text style={styles.statNumber}>${todayStats.revenue}</Text>
              <Text style={styles.statLabel}>Revenue</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Users size={20} color="#8B5CF6" strokeWidth={2} />
              </View>
              <Text style={styles.statNumber}>{todayStats.newClients}</Text>
              <Text style={styles.statLabel}>New Clients</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Star size={20} color="#F59E0B" strokeWidth={2} />
              </View>
              <Text style={styles.statNumber}>{todayStats.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/business/services')}
            >
              <Plus size={24} color="#F43F5E" strokeWidth={2} />
              <Text style={styles.actionText}>Add Service</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/business/calendar')}
            >
              <Calendar size={24} color="#8B5CF6" strokeWidth={2} />
              <Text style={styles.actionText}>Manage Calendar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/business/media')}
            >
              <Package size={24} color="#10B981" strokeWidth={2} />
              <Text style={styles.actionText}>Upload Media</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/business/messages')}
            >
              <MessageCircle size={24} color="#8B5CF6" strokeWidth={2} />
              <Text style={styles.actionText}>Messages</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/business/notifications')}
            >
              <Bell size={24} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.actionText}>Notifications</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/business/public-profile')}
            >
              <Users size={24} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.actionText}>Public Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Bookings</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <Image source={{ uri: booking.image }} style={styles.clientImage} />
              
              <View style={styles.bookingInfo}>
                <Text style={styles.clientName}>{booking.clientName}</Text>
                <Text style={styles.serviceName}>{booking.service}</Text>
                <View style={styles.bookingDetails}>
                  <Clock size={14} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.bookingTime}>{booking.time}</Text>
                </View>
              </View>
              
              <View style={styles.bookingActions}>
                <View style={[
                  styles.statusBadge,
                  booking.status === 'confirmed' && styles.confirmedBadge,
                  booking.status === 'pending' && styles.pendingBadge,
                ]}>
                  <Text style={[
                    styles.statusText,
                    booking.status === 'confirmed' && styles.confirmedText,
                    booking.status === 'pending' && styles.pendingText,
                  ]}>
                    {booking.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Premium Membership Upsell */}
        {!isSubscriptionActive() && (
          <View style={styles.section}>
            <View style={styles.premiumCard}>
              <View style={styles.premiumHeader}>
                <View style={styles.premiumIconContainer}>
                  <TrendingUp size={24} color="#F59E0B" strokeWidth={2} />
                </View>
                <View style={styles.premiumInfo}>
                  <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                  <Text style={styles.premiumSubtitle}>Unlock advanced analytics and features</Text>
                </View>
              </View>
              
              <View style={styles.premiumFeatures}>
                <Text style={styles.featureItem}>• Advanced booking analytics</Text>
                <Text style={styles.featureItem}>• Custom branding options</Text>
                <Text style={styles.featureItem}>• Priority customer support</Text>
                <Text style={styles.featureItem}>• Automated marketing tools</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.premiumButton}
                onPress={() => router.push('/business/membership')}
              >
                <Text style={styles.premiumButtonText}>Start Free Trial</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {isSubscriptionActive() && (
          <View style={styles.section}>
            <View style={styles.activePlanCard}>
              <View style={styles.activePlanHeader}>
                <View style={styles.activePlanIconContainer}>
                  <Star size={24} color="#10B981" strokeWidth={2} />
                </View>
                <View style={styles.activePlanInfo}>
                  <Text style={styles.activePlanTitle}>Active Plan: {currentPlan.name}</Text>
                  <Text style={styles.activePlanSubtitle}>You're enjoying all premium features</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.managePlanButton}
                onPress={() => router.push('/business/membership')}
              >
                <Text style={styles.managePlanButtonText}>Manage Subscription</Text>
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
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#F43F5E',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
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
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#F43F5E',
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
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  clientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  bookingInfo: {
    flex: 1,
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  serviceName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  bookingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  bookingActions: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  confirmedBadge: {
    backgroundColor: '#DCFCE7',
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  confirmedText: {
    color: '#166534',
  },
  pendingText: {
    color: '#D97706',
  },
  premiumCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumIconContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 8,
    marginRight: 16,
  },
  premiumInfo: {
    flex: 1,
  },
  premiumTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  premiumFeatures: {
    marginBottom: 20,
  },
  featureItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
  premiumButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  premiumButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  activePlanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  activePlanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activePlanIconContainer: {
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    padding: 8,
    marginRight: 16,
  },
  activePlanInfo: {
    flex: 1,
  },
  activePlanTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 4,
  },
  activePlanSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  managePlanButton: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  managePlanButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});