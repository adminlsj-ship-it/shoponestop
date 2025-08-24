import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, Plus, Phone, MessageCircle, Star, Calendar, User, Filter } from 'lucide-react-native';

const clients = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+1 (555) 123-4567',
    totalBookings: 12,
    totalSpent: 1240,
    lastVisit: '2024-12-15',
    rating: 5,
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    notes: 'Prefers morning appointments, allergic to sulfates',
  },
  {
    id: '2',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@email.com',
    phone: '+1 (555) 987-6543',
    totalBookings: 8,
    totalSpent: 680,
    lastVisit: '2024-12-10',
    rating: 5,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    notes: 'Regular client, books monthly highlights',
  },
  {
    id: '3',
    name: 'Isabella Chen',
    email: 'isabella.chen@email.com',
    phone: '+1 (555) 456-7890',
    totalBookings: 15,
    totalSpent: 1850,
    lastVisit: '2024-12-12',
    rating: 5,
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400',
    notes: 'VIP client, prefers Jessica as stylist',
  },
];

export default function ClientsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = () => {
    Alert.alert('Add Client', 'Client management feature coming soon!');
  };

  const handleCallClient = (phone: string) => {
    Alert.alert('Call Client', `Calling ${phone}...`);
  };

  const handleMessageClient = (name: string) => {
    Alert.alert('Message Client', `Sending message to ${name}...`);
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
        <Text style={styles.title}>Clients</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddClient}>
          <Plus size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clients..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#F43F5E" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{clients.length}</Text>
          <Text style={styles.statLabel}>Total Clients</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            ${clients.reduce((sum, client) => sum + client.totalSpent, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4.9</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </View>
      </View>

      {/* Clients List */}
      <ScrollView style={styles.clientsList} showsVerticalScrollIndicator={false}>
        {filteredClients.map((client) => (
          <View key={client.id} style={styles.clientCard}>
            <Image source={{ uri: client.image }} style={styles.clientImage} />
            
            <View style={styles.clientInfo}>
              <View style={styles.clientHeader}>
                <Text style={styles.clientName}>{client.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
                  <Text style={styles.rating}>{client.rating}</Text>
                </View>
              </View>
              
              <Text style={styles.clientEmail}>{client.email}</Text>
              <Text style={styles.clientPhone}>{client.phone}</Text>
              
              <View style={styles.clientStats}>
                <Text style={styles.statText}>{client.totalBookings} bookings</Text>
                <Text style={styles.statText}>•</Text>
                <Text style={styles.statText}>${client.totalSpent} spent</Text>
                <Text style={styles.statText}>•</Text>
                <Text style={styles.statText}>Last: {client.lastVisit}</Text>
              </View>
              
              {client.notes && (
                <Text style={styles.clientNotes}>{client.notes}</Text>
              )}
            </View>
            
            <View style={styles.clientActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleCallClient(client.phone)}
              >
                <Phone size={16} color="#F43F5E" strokeWidth={2} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleMessageClient(client.name)}
              >
                <MessageCircle size={16} color="#F43F5E" strokeWidth={2} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Calendar size={16} color="#F43F5E" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
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
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
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
    color: '#F43F5E',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  clientsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  clientCard: {
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  clientInfo: {
    flex: 1,
  },
  clientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#111827',
  },
  clientEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  clientPhone: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  clientStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  clientNotes: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#374151',
    fontStyle: 'italic',
  },
  clientActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});