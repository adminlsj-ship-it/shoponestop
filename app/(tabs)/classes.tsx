import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, Filter, Calendar, Clock, Users, MapPin, Star, GraduationCap, BookOpen } from 'lucide-react-native';

const categories = ['All', 'Makeup MUA', 'Hair Stylist', 'Braider', 'Weaves', 'Natural Stylist', 'Kids Stylist', 'Barber', 'Esthetician', 'Nails', 'Spa', 'Fashion Stylist'];

const classes = [
  {
    id: '1',
    title: 'Professional Makeup Masterclass',
    instructor: 'Jessica Miller',
    business: 'Glow Beauty Academy',
    description: 'Learn advanced makeup techniques from industry professionals. Perfect for aspiring makeup artists.',
    price: 150,
    duration: 180,
    maxParticipants: 12,
    currentParticipants: 8,
    date: '2024-12-25',
    time: '10:00 AM',
    location: 'Manhattan, NY',
    skillLevel: 'intermediate',
    category: 'Makeup',
    materialsIncluded: true,
    rating: 4.9,
    reviews: 34,
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
  },
  {
    id: '2',
    title: 'Hair Cutting Fundamentals',
    instructor: 'Michael Rodriguez',
    business: 'Elite Hair Academy',
    description: 'Master the basics of professional hair cutting with hands-on practice and expert guidance.',
    price: 200,
    duration: 240,
    maxParticipants: 8,
    currentParticipants: 5,
    date: '2024-12-28',
    time: '9:00 AM',
    location: 'Beverly Hills, CA',
    skillLevel: 'beginner',
    category: 'Hair Styling',
    materialsIncluded: true,
    rating: 4.8,
    reviews: 28,
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
  {
    id: '3',
    title: 'Advanced Skincare Workshop',
    instructor: 'Dr. Sarah Chen',
    business: 'Skin Science Institute',
    description: 'Deep dive into skincare science, ingredient analysis, and treatment protocols.',
    price: 120,
    duration: 150,
    maxParticipants: 15,
    currentParticipants: 12,
    date: '2024-12-30',
    time: '2:00 PM',
    location: 'Miami, FL',
    skillLevel: 'advanced',
    category: 'Skincare',
    materialsIncluded: false,
    rating: 4.9,
    reviews: 42,
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
  },
  {
    id: '4',
    title: 'Nail Art Techniques',
    instructor: 'Luna Park',
    business: 'Artistic Nails Studio',
    description: 'Create stunning nail art designs with professional techniques and tools.',
    price: 85,
    duration: 120,
    maxParticipants: 10,
    currentParticipants: 7,
    date: '2025-01-02',
    time: '11:00 AM',
    location: 'Los Angeles, CA',
    skillLevel: 'all',
    category: 'Nail Art',
    materialsIncluded: true,
    rating: 4.7,
    reviews: 19,
    image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
];

export default function ClassesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = classes.filter(classItem => 
    (selectedCategory === 'All' || classItem.category === selectedCategory) &&
    (searchQuery === '' || 
     classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
     classItem.business.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#EF4444';
      default: return '#8B5CF6';
    }
  };

  const getAvailabilityStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return { text: 'Almost Full', color: '#EF4444' };
    if (percentage >= 70) return { text: 'Filling Fast', color: '#F59E0B' };
    return { text: 'Available', color: '#10B981' };
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Learn & Grow</Text>
          <Text style={styles.title}>Beauty Classes & Workshops</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search classes, instructors, or topics..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#F43F5E" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryCard,
                  selectedCategory === category && styles.categoryCardSelected
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category && styles.categoryNameSelected
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Classes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Classes</Text>
          {filteredClasses.map((classItem) => {
            const availability = getAvailabilityStatus(classItem.currentParticipants, classItem.maxParticipants);
            
            return (
              <TouchableOpacity 
                key={classItem.id} 
                style={styles.classCard}
                onPress={() => router.push(`/classes/details?id=${classItem.id}`)}
              >
                <Image source={{ uri: classItem.image }} style={styles.classImage} />
                
                {classItem.featured && (
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredText}>Featured</Text>
                  </View>
                )}
                
                <View style={styles.availabilityBadge}>
                  <Text style={[styles.availabilityText, { color: availability.color }]}>
                    {availability.text}
                  </Text>
                </View>
                
                <View style={styles.classInfo}>
                  <View style={styles.classHeader}>
                    <Text style={styles.className}>{classItem.title}</Text>
                    <View style={[
                      styles.skillBadge,
                      { backgroundColor: getSkillLevelColor(classItem.skillLevel) + '20' }
                    ]}>
                      <Text style={[
                        styles.skillText,
                        { color: getSkillLevelColor(classItem.skillLevel) }
                      ]}>
                        {classItem.skillLevel}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.instructorName}>with {classItem.instructor}</Text>
                  <Text style={styles.businessName}>{classItem.business}</Text>
                  <Text style={styles.classDescription}>{classItem.description}</Text>
                  
                  <View style={styles.classDetails}>
                    <View style={styles.detailRow}>
                      <View style={styles.detailItem}>
                        <Calendar size={16} color="#6B7280" strokeWidth={2} />
                        <Text style={styles.detailText}>{classItem.date}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Clock size={16} color="#6B7280" strokeWidth={2} />
                        <Text style={styles.detailText}>{classItem.time}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <View style={styles.detailItem}>
                        <Users size={16} color="#6B7280" strokeWidth={2} />
                        <Text style={styles.detailText}>
                          {classItem.currentParticipants}/{classItem.maxParticipants} spots
                        </Text>
                      </View>
                      <View style={styles.detailItem}>
                        <MapPin size={16} color="#6B7280" strokeWidth={2} />
                        <Text style={styles.detailText}>{classItem.location}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.ratingContainer}>
                    <Star size={16} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
                    <Text style={styles.rating}>{classItem.rating}</Text>
                    <Text style={styles.reviews}>({classItem.reviews} reviews)</Text>
                    
                    {classItem.materialsIncluded && (
                      <View style={styles.materialsBadge}>
                        <BookOpen size={14} color="#10B981" strokeWidth={2} />
                        <Text style={styles.materialsText}>Materials Included</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>${classItem.price}</Text>
                    <Text style={styles.duration}>{classItem.duration} minutes</Text>
                    <TouchableOpacity style={styles.registerButton}>
                      <Text style={styles.registerButtonText}>Register Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Upcoming Classes Quick View */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week's Classes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {classes.slice(0, 3).map((classItem) => (
              <TouchableOpacity key={classItem.id} style={styles.quickClassCard}>
                <Image source={{ uri: classItem.image }} style={styles.quickClassImage} />
                <View style={styles.quickClassInfo}>
                  <Text style={styles.quickClassName}>{classItem.title}</Text>
                  <Text style={styles.quickClassInstructor}>{classItem.instructor}</Text>
                  <Text style={styles.quickClassDate}>{classItem.date} • {classItem.time}</Text>
                  <Text style={styles.quickClassPrice}>${classItem.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryCardSelected: {
    backgroundColor: '#F43F5E',
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  categoryNameSelected: {
    color: '#FFFFFF',
  },
  classCard: {
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
  classImage: {
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
  availabilityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  availabilityText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  classInfo: {
    padding: 20,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  className: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  skillBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  skillText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    textTransform: 'capitalize',
  },
  instructorName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8B5CF6',
    marginBottom: 2,
  },
  businessName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  classDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  classDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
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
    marginRight: 12,
  },
  materialsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  materialsText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#166534',
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
  duration: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  registerButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  registerButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  quickClassCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginLeft: 20,
    marginRight: 8,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  quickClassImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  quickClassInfo: {
    padding: 16,
  },
  quickClassName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  quickClassInstructor: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8B5CF6',
    marginBottom: 4,
  },
  quickClassDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  quickClassPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#F43F5E',
  },
});