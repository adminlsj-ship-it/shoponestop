import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  GraduationCap,
  BookOpen,
  Award,
  Share,
  Heart
} from 'lucide-react-native';

const classDetails = {
  id: '1',
  title: 'Professional Makeup Masterclass',
  instructor: {
    name: 'Jessica Miller',
    bio: 'Professional makeup artist with 10+ years experience. Worked with celebrities and fashion shows.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    totalClasses: 45,
  },
  business: 'Glow Beauty Academy',
  description: 'Master the art of professional makeup in this comprehensive hands-on workshop. Learn advanced techniques used by industry professionals, from color theory to contouring and highlighting. Perfect for aspiring makeup artists or beauty enthusiasts looking to elevate their skills.',
  price: 150,
  duration: 180,
  maxParticipants: 12,
  currentParticipants: 8,
  date: '2024-12-25',
  time: '10:00 AM',
  endTime: '1:00 PM',
  location: 'Glow Beauty Academy, 123 Fashion Ave, Manhattan, NY',
  skillLevel: 'intermediate',
  category: 'Makeup',
  materialsIncluded: true,
  materialsList: 'Professional makeup brushes, color palette, practice face charts, take-home kit',
  rating: 4.9,
  reviews: 34,
  images: [
    'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  curriculum: [
    'Color theory and skin tone matching',
    'Foundation application techniques',
    'Contouring and highlighting',
    'Eye makeup artistry',
    'Lip techniques and trends',
    'Setting and finishing touches',
  ],
  requirements: [
    'Basic understanding of makeup application',
    'Bring your own makeup sponges',
    'Comfortable clothing recommended',
  ],
  reviews: [
    {
      id: '1',
      student: 'Emma R.',
      rating: 5,
      comment: 'Incredible class! Jessica is an amazing teacher and I learned so much.',
      date: '2 weeks ago',
    },
    {
      id: '2',
      student: 'Sofia M.',
      rating: 5,
      comment: 'Worth every penny. The techniques I learned have transformed my makeup skills.',
      date: '1 month ago',
    },
  ],
};

export default function ClassDetailsScreen() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#EF4444';
      default: return '#8B5CF6';
    }
  };

  const spotsRemaining = classDetails.maxParticipants - classDetails.currentParticipants;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Share size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={20} 
                color="#FFFFFF" 
                fill={isFavorite ? "#FFFFFF" : "transparent"}
                strokeWidth={2} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <Image 
            source={{ uri: classDetails.images[selectedImageIndex] }} 
            style={styles.mainImage} 
          />
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.imageSelector}
          >
            {classDetails.images.map((image, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => setSelectedImageIndex(index)}
              >
                <Image 
                  source={{ uri: image }} 
                  style={[
                    styles.thumbnailImage,
                    index === selectedImageIndex && styles.selectedThumbnail
                  ]} 
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Class Info */}
        <View style={styles.classInfo}>
          <View style={styles.classHeader}>
            <Text style={styles.className}>{classDetails.title}</Text>
            <View style={[
              styles.skillBadge,
              { backgroundColor: getSkillLevelColor(classDetails.skillLevel) + '20' }
            ]}>
              <GraduationCap size={14} color={getSkillLevelColor(classDetails.skillLevel)} strokeWidth={2} />
              <Text style={[
                styles.skillText,
                { color: getSkillLevelColor(classDetails.skillLevel) }
              ]}>
                {classDetails.skillLevel}
              </Text>
            </View>
          </View>
          
          <Text style={styles.businessName}>{classDetails.business}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
            <Text style={styles.rating}>{classDetails.rating}</Text>
            <Text style={styles.reviewCount}>({classDetails.reviews} reviews)</Text>
          </View>
          
          <Text style={styles.description}>{classDetails.description}</Text>
        </View>

        {/* Class Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Class Details</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Calendar size={20} color="#F43F5E" strokeWidth={2} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>{classDetails.date}</Text>
                <Text style={styles.detailSubValue}>{classDetails.time} - {classDetails.endTime}</Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <Clock size={20} color="#8B5CF6" strokeWidth={2} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>{classDetails.duration} minutes</Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <Users size={20} color="#10B981" strokeWidth={2} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Class Size</Text>
                <Text style={styles.detailValue}>
                  {classDetails.currentParticipants}/{classDetails.maxParticipants} registered
                </Text>
                <Text style={[styles.detailSubValue, { color: spotsRemaining <= 3 ? '#EF4444' : '#10B981' }]}>
                  {spotsRemaining} spots remaining
                </Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <MapPin size={20} color="#F59E0B" strokeWidth={2} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{classDetails.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Instructor Info */}
        <View style={styles.instructorSection}>
          <Text style={styles.sectionTitle}>Your Instructor</Text>
          <View style={styles.instructorCard}>
            <Image source={{ uri: classDetails.instructor.image }} style={styles.instructorImage} />
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>{classDetails.instructor.name}</Text>
              <View style={styles.instructorStats}>
                <View style={styles.instructorStat}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
                  <Text style={styles.instructorStatText}>{classDetails.instructor.rating}</Text>
                </View>
                <View style={styles.instructorStat}>
                  <Award size={14} color="#8B5CF6" strokeWidth={2} />
                  <Text style={styles.instructorStatText}>{classDetails.instructor.totalClasses} classes</Text>
                </View>
              </View>
              <Text style={styles.instructorBio}>{classDetails.instructor.bio}</Text>
            </View>
          </View>
        </View>

        {/* Curriculum */}
        <View style={styles.curriculumSection}>
          <Text style={styles.sectionTitle}>What You'll Learn</Text>
          <View style={styles.curriculumCard}>
            {classDetails.curriculum.map((item, index) => (
              <View key={index} style={styles.curriculumItem}>
                <View style={styles.curriculumNumber}>
                  <Text style={styles.curriculumNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.curriculumText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Materials & Requirements */}
        <View style={styles.materialsSection}>
          <Text style={styles.sectionTitle}>Materials & Requirements</Text>
          
          {classDetails.materialsIncluded && (
            <View style={styles.materialsCard}>
              <View style={styles.materialsHeader}>
                <BookOpen size={20} color="#10B981" strokeWidth={2} />
                <Text style={styles.materialsTitle}>Materials Included</Text>
              </View>
              <Text style={styles.materialsText}>{classDetails.materialsList}</Text>
            </View>
          )}
          
          <View style={styles.requirementsCard}>
            <Text style={styles.requirementsTitle}>What to Bring</Text>
            {classDetails.requirements.map((requirement, index) => (
              <Text key={index} style={styles.requirementText}>• {requirement}</Text>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Student Reviews</Text>
          {classDetails.reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewStudent}>{review.student}</Text>
                <View style={styles.reviewRating}>
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index}
                      size={14} 
                      color="#F59E0B" 
                      fill={index < review.rating ? "#F59E0B" : "transparent"}
                      strokeWidth={2} 
                    />
                  ))}
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>Class Fee</Text>
          <Text style={styles.priceAmount}>${classDetails.price}</Text>
        </View>
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => router.push('/classes/registration')}
        >
          <GraduationCap size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.registerButtonText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGallery: {
    marginBottom: 24,
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  imageSelector: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    opacity: 0.6,
  },
  selectedThumbnail: {
    opacity: 1,
    borderWidth: 2,
    borderColor: '#F43F5E',
  },
  classInfo: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  className: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  skillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  skillText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  businessName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#8B5CF6',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginLeft: 6,
  },
  reviewCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  detailsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  detailSubValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  instructorSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  instructorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  instructorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 8,
  },
  instructorStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  instructorStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  instructorStatText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#374151',
  },
  instructorBio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  curriculumSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  curriculumCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  curriculumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  curriculumNumber: {
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  curriculumNumberText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  curriculumText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  materialsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  materialsCard: {
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
  materialsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  materialsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  materialsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  requirementsCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  requirementsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  requirementText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
    lineHeight: 20,
  },
  reviewsSection: {
    paddingHorizontal: 20,
    marginBottom: 120,
  },
  reviewCard: {
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
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  reviewStudent: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 'auto',
  },
  reviewComment: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  priceInfo: {
    flex: 1,
  },
  priceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  priceAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
  },
  registerButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  registerButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});