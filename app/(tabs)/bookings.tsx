import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, Phone, MessageCircle } from 'lucide-react-native';

const upcomingBookings = [
  {
    id: '1',
    businessName: 'Luxe Hair Studio',
    service: 'Premium Hair Cut & Style',
    date: 'Today',
    time: '2:30 PM',
    status: 'confirmed',
    location: 'Beverly Hills, CA',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone: '+1 (555) 123-4567',
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
    phone: '+1 (555) 987-6543',
  },
];

const pastBookings = [
  {
    id: '3',
    businessName: 'Zen Spa Retreat',
    service: 'Full Body Massage',
    date: 'Dec 15, 2024',
    time: '3:00 PM',
    status: 'completed',
    location: 'Miami, FL',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5,
  },
];

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const renderBookingCard = (booking: any, isPast = false) => (
    <View key={booking.id} style={styles.bookingCard}>
      <Image source={{ uri: booking.image }} style={styles.bookingImage} />
      
      <View style={styles.bookingInfo}>
        <View style={styles.bookingHeader}>
          <Text style={styles.businessName}>{booking.businessName}</Text>
          <View style={[
            styles.statusBadge,
            booking.status === 'confirmed' && styles.confirmedBadge,
            booking.status === 'completed' && styles.completedBadge,
          ]}>
            <Text style={[
              styles.statusText,
              booking.status === 'confirmed' && styles.confirmedText,
              booking.status === 'completed' && styles.completedText,
            ]}>
              {booking.status}
            </Text>
          </View>
        </View>
        
        <Text style={styles.serviceName}>{booking.service}</Text>
        
        <View style={styles.bookingDetails}>
          <View style={styles.detailItem}>
            <Calendar size={16} color="#6B7280" strokeWidth={2} />
            <Text style={styles.detailText}>{booking.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color="#6B7280" strokeWidth={2} />
            <Text style={styles.detailText}>{booking.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <MapPin size={16} color="#6B7280" strokeWidth={2} />
            <Text style={styles.detailText}>{booking.location}</Text>
          </View>
        </View>
        
        {!isPast && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Phone size={16} color="#F43F5E" strokeWidth={2} />
              <Text style={styles.secondaryButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <MessageCircle size={16} color="#F43F5E" strokeWidth={2} />
              <Text style={styles.secondaryButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {isPast && booking.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Your Rating:</Text>
            <View style={styles.stars}>
              {[...Array(5)].map((_, index) => (
                <Text key={index} style={styles.star}>
                  {index < booking.rating ? '⭐' : '☆'}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'upcoming' && (
          <View>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => renderBookingCard(booking))
            ) : (
              <View style={styles.emptyState}>
                <Calendar size={48} color="#D1D5DB" strokeWidth={2} />
                <Text style={styles.emptyTitle}>No upcoming bookings</Text>
                <Text style={styles.emptyText}>Start exploring to book your next beauty service!</Text>
              </View>
            )}
          </View>
        )}
        
        {activeTab === 'past' && (
          <View>
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => renderBookingCard(booking, true))
            ) : (
              <View style={styles.emptyState}>
                <Calendar size={48} color="#D1D5DB" strokeWidth={2} />
                <Text style={styles.emptyTitle}>No past bookings</Text>
                <Text style={styles.emptyText}>Your booking history will appear here.</Text>
              </View>
            )}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#111827',
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  bookingImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  bookingInfo: {
    padding: 20,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  businessName: {
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
  confirmedBadge: {
    backgroundColor: '#DCFCE7',
  },
  completedBadge: {
    backgroundColor: '#E0E7FF',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  confirmedText: {
    color: '#166534',
  },
  completedText: {
    color: '#3730A3',
  },
  serviceName: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  bookingDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  secondaryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#F43F5E',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});