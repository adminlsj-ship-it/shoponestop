import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Star, Heart, GraduationCap } from 'lucide-react-native';

const categories = [
  { 
    id: '1', 
    name: 'Hair Stylist', 
    icon: '💇‍♀️',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '2', 
    name: 'Braider', 
    icon: '🤎',
    image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '3', 
    name: 'Weaves', 
    icon: '✨',
    image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '4', 
    name: 'Natural Stylist', 
    icon: '🌿',
    image: 'https://images.pexels.com/photos/3992742/pexels-photo-3992742.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '5', 
    name: 'Kids Stylist', 
    icon: '👶',
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '6', 
    name: 'Barber', 
    icon: '✂️',
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '7', 
    name: 'Makeup MUA', 
    icon: '💄',
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '8', 
    name: 'Esthetician', 
    icon: '🧴',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '9', 
    name: 'Nails', 
    icon: '💅',
    image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '10', 
    name: 'Spa', 
    icon: '🧖‍♀️',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '11', 
    name: 'Classes/Tutorials', 
    icon: '🎓',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '12', 
    name: 'Fashion Stylist', 
    icon: '👗',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
];

const services = [
  {
    id: '1',
    businessName: 'Luxe Hair Studio',
    service: 'Premium Hair Cut & Style',
    price: '$85',
    rating: 4.9,
    reviews: 127,
    location: 'Beverly Hills, CA',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
  },
  {
    id: '2',
    businessName: 'Glow Beauty Bar',
    service: 'Professional Makeup',
    price: '$120',
    rating: 4.8,
    reviews: 89,
    location: 'Manhattan, NY',
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
  {
    id: '3',
    businessName: 'Zen Spa Retreat',
    service: 'Full Body Massage',
    price: '$150',
    rating: 4.9,
    reviews: 203,
    location: 'Miami, FL',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
  },
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.title}>Find your perfect beauty service</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search services, salons, or locations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardSelected
                ]}
                onPress={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
              >
                <View style={styles.categoryImageContainer}>
                  <Image source={{ uri: category.image }} style={styles.categoryImage} />
                  <View style={styles.categoryOverlay}>
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.categoryNameSelected
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          {services.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceCard}>
              <Image source={{ uri: service.image }} style={styles.serviceImage} />
              {service.featured && (
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredText}>Featured</Text>
                </View>
              )}
              <TouchableOpacity style={styles.favoriteButton}>
                <Heart size={20} color="#F43F5E" strokeWidth={2} />
              </TouchableOpacity>
              
              <View style={styles.serviceInfo}>
                <Text style={styles.businessName}>{service.businessName}</Text>
                <Text style={styles.serviceName}>{service.service}</Text>
                
                <View style={styles.serviceDetails}>
                  <View style={styles.ratingContainer}>
                    <Star size={16} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
                    <Text style={styles.rating}>{service.rating}</Text>
                    <Text style={styles.reviews}>({service.reviews})</Text>
                  </View>
                  
                  <View style={styles.locationContainer}>
                    <MapPin size={14} color="#6B7280" strokeWidth={2} />
                    <Text style={styles.location}>{service.location}</Text>
                  </View>
                </View>
                
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{service.price}</Text>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#111827',
    lineHeight: 36,
  },
  searchContainer: {
    paddingHorizontal: 20,
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryCardSelected: {
    backgroundColor: '#F43F5E',
    transform: [{ scale: 1.05 }],
  },
  categoryImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  categoryImage: {
    width: 80,
    height: 60,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  categoryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  categoryNameSelected: {
    color: '#FFFFFF',
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  featuredText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceInfo: {
    padding: 20,
  },
  businessName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 4,
  },
  serviceName: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  serviceDetails: {
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    marginLeft: 4,
  },
  reviews: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#F43F5E',
  },
  bookButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  bookButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});