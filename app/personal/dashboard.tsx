import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Package, CreditCard, MapPin, Star, Clock, X, CircleCheck as CheckCircle } from 'lucide-react-native';

const upcomingAppointments = [
  {
    id: '1',
    businessName: 'Luxe Hair Studio',
    service: 'Premium Hair Cut & Style',
    date: 'Today',
    time: '2:30 PM',
    status: 'confirmed',
    location: 'Beverly Hills, CA',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 85,
  },
  {
    id: '2',
    businessName: 'Glow Beauty Bar',
    service: 'Professional Makeup',
    date: 'Tomorrow',
    time: '11:00 AM',
    status: 'confirmed',
    location: 'Manhattan, NY',
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 120,
  },
];

const recentPurchases = [
  {
    id: '1',
    productName: 'Luxury Hydrating Serum',
    brand: 'GlowSkin',
    price: 89,
    purchaseDate: '2024-12-15',
    status: 'delivered',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    productName: 'Professional Makeup Palette',
    brand: 'ColorPro',
    price: 65,
    purchaseDate: '2024-12-12',
    status: 'shipped',
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const pastAppointments = [
  {
    id: '3',
    businessName: 'Zen Spa Retreat',
    service: 'Full Body Massage',
    date: '2024-12-15',
    time: '3:00 PM',
    status: 'completed',
    location: 'Miami, FL',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 150,
    rating: 5,
  },
];

export default function PersonalDashboard() {
  const [selectedTab, setSelectedTab] = useState('appointments');

  const totalSpent = [...recentPurchases, ...upcomingAppointments, ...pastAppointments]
    .reduce((sum, item) => sum + item.price, 0);

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
          <Text style={styles.title}>My Dashboard</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Calendar size={20} color="#F43F5E" strokeWidth={2} />
            <Text style={styles.statNumber}>{upcomingAppointments.length}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={styles.statCard}>
            <Package size={20} color="#10B981" strokeWidth={2} />
            <Text style={styles.statNumber}>{recentPurchases.length}</Text>
            <Text style={styles.statLabel}>Recent Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Star size={20} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
          <View style={styles.statCard}>
            <CreditCard size={20} color="#8B5CF6" strokeWidth={2} />
            <Text style={styles.statNumber}>${totalSpent}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'appointments' && styles.activeTab]}
            onPress={() => setSelectedTab('appointments')}
          >
            <Text style={[styles.tabText, selectedTab === 'appointments' && styles.activeTabText]}>
              Appointments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'purchases' && styles.activeTab]}
            onPress={() => setSelectedTab('purchases')}
          >
            <Text style={[styles.tabText, selectedTab === 'purchases' && styles.activeTabText]}>
              Purchases
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {selectedTab === 'appointments' && (
          <View style={styles.section}>
            {/* Upcoming Appointments */}
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            {upcomingAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <Image source={{ uri: appointment.image }} style={styles.appointmentImage} />
                
                <View style={styles.appointmentInfo}>
                  <Text style={styles.businessName}>{appointment.businessName}</Text>
                  <Text style={styles.serviceName}>{appointment.service}</Text>
                  
                  <View style={styles.appointmentDetails}>
                    <View style={styles.detailItem}>
                      <Calendar size={14} color="#6B7280" strokeWidth={2} />
                      <Text style={styles.detailText}>{appointment.date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Clock size={14} color="#6B7280" strokeWidth={2} />
                      <Text style={styles.detailText}>{appointment.time}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MapPin size={14} color="#6B7280" strokeWidth={2} />
                      <Text style={styles.detailText}>{appointment.location}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.appointmentFooter}>
                    <Text style={styles.appointmentPrice}>${appointment.price}</Text>
                    <View style={styles.statusBadge}>
                      <CheckCircle size={12} color="#10B981" strokeWidth={2} />
                      <Text style={styles.statusText}>Confirmed</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            {/* Past Appointments */}
            <Text style={styles.sectionTitle}>Recent Appointments</Text>
            {pastAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <Image source={{ uri: appointment.image }} style={styles.appointmentImage} />
                
                <View style={styles.appointmentInfo}>
                  <Text style={styles.businessName}>{appointment.businessName}</Text>
                  <Text style={styles.serviceName}>{appointment.service}</Text>
                  
                  <View style={styles.appointmentDetails}>
                    <View style={styles.detailItem}>
                      <Calendar size={14} color="#6B7280" strokeWidth={2} />
                      <Text style={styles.detailText}>{appointment.date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Clock size={14} color="#6B7280" strokeWidth={2} />
                      <Text style={styles.detailText}>{appointment.time}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.appointmentFooter}>
                    <Text style={styles.appointmentPrice}>${appointment.price}</Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingLabel}>Your Rating:</Text>
                      <View style={styles.stars}>
                        {[...Array(5)].map((_, index) => (
                          <Text key={index} style={styles.star}>
                            {index < appointment.rating ? '⭐' : '☆'}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {selectedTab === 'purchases' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Purchases</Text>
            {recentPurchases.map((purchase) => (
              <View key={purchase.id} style={styles.purchaseCard}>
                <Image source={{ uri: purchase.image }} style={styles.purchaseImage} />
                
                <View style={styles.purchaseInfo}>
                  <Text style={styles.productName}>{purchase.productName}</Text>
                  <Text style={styles.brandName}>{purchase.brand}</Text>
                  <Text style={styles.purchaseDate}>Purchased on {purchase.purchaseDate}</Text>
                  
                  <View style={styles.purchaseFooter}>
                    <Text style={styles.purchasePrice}>${purchase.price}</Text>
                    <View style={[
                      styles.purchaseStatusBadge,
                      purchase.status === 'delivered' && styles.deliveredBadge,
                      purchase.status === 'shipped' && styles.shippedBadge,
                    ]}>
                      <Text style={[
                        styles.purchaseStatusText,
                        purchase.status === 'delivered' && styles.deliveredText,
                        purchase.status === 'shipped' && styles.shippedText,
                      ]}>
                        {purchase.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)')}
            >
              <Calendar size={24} color="#F43F5E" strokeWidth={2} />
              <Text style={styles.actionText}>Book Service</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/products')}
            >
              <Package size={24} color="#10B981" strokeWidth={2} />
              <Text style={styles.actionText}>Shop Products</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/bookings')}
            >
              <Clock size={24} color="#8B5CF6" strokeWidth={2} />
              <Text style={styles.actionText}>View Bookings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/checkout/cart')}
            >
              <CreditCard size={24} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.actionText}>My Orders</Text>
            </TouchableOpacity>
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
    fontSize: 16,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#F43F5E',
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
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  appointmentInfo: {
    flex: 1,
  },
  businessName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  serviceName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  appointmentDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  appointmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#F43F5E',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#166534',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontSize: 12,
  },
  purchaseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  purchaseImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  purchaseInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  brandName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8B5CF6',
    marginBottom: 4,
  },
  purchaseDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  purchaseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  purchasePrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#10B981',
  },
  purchaseStatusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deliveredBadge: {
    backgroundColor: '#DCFCE7',
  },
  shippedBadge: {
    backgroundColor: '#DBEAFE',
  },
  purchaseStatusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    textTransform: 'capitalize',
  },
  deliveredText: {
    color: '#166534',
  },
  shippedText: {
    color: '#1E40AF',
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 40,
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
});