import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Phone,
  MessageCircle,
  Heart,
  Share,
  Calendar
} from 'lucide-react-native';

const serviceDetails = {
  id: '1',
  businessName: 'Luxe Hair Studio',
  service: 'Premium Hair Cut & Style',
  description: 'Experience the ultimate in hair care with our premium cut and style service. Includes consultation, shampoo, precision cut, blow-dry, and styling. Our expert stylists use only the finest products to ensure your hair looks and feels amazing.',
  price: 85,
  duration: 90,
  rating: 4.9,
  reviews: 127,
  location: 'Beverly Hills, CA',
  phone: '+1 (555) 123-4567',
  images: [
    'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3992742/pexels-photo-3992742.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  stylist: {
    name: 'Jessica Miller',
    experience: '8 years',
    specialties: ['Color Specialist', 'Curly Hair Expert'],
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  reviews: [
    {
      id: '1',
      client: 'Emily R.',
      rating: 5,
      comment: 'Amazing service! Jessica is incredibly talented and made me feel so comfortable.',
      date: '2 days ago',
    },
    {
      id: '2',
      client: 'Sarah M.',
      rating: 5,
      comment: 'Best hair salon in Beverly Hills! The attention to detail is incredible.',
      date: '1 week ago',
    },
  ],
};

export default function ServiceDetailsScreen() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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
            source={{ uri: serviceDetails.images[selectedImageIndex] }} 
            style={styles.mainImage} 
          />
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.imageSelector}
          >
            {serviceDetails.images.map((image, index) => (
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

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <Text style={styles.businessName}>{serviceDetails.businessName}</Text>
          <Text style={styles.serviceName}>{serviceDetails.service}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
            <Text style={styles.rating}>{serviceDetails.rating}</Text>
            <Text style={styles.reviewCount}>({serviceDetails.reviews} reviews)</Text>
          </View>
          
          <View style={styles.serviceDetails}>
            <View style={styles.detailItem}>
              <MapPin size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.detailText}>{serviceDetails.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Clock size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.detailText}>{serviceDetails.duration} minutes</Text>
            </View>
            <View style={styles.detailItem}>
              <DollarSign size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.detailText}>${serviceDetails.price}</Text>
            </View>
          </View>

          <Text style={styles.description}>{serviceDetails.description}</Text>
        </View>

        {/* Stylist Info */}
        <View style={styles.stylistSection}>
          <Text style={styles.sectionTitle}>Your Stylist</Text>
          <View style={styles.stylistCard}>
            <Image source={{ uri: serviceDetails.stylist.image }} style={styles.stylistImage} />
            <View style={styles.stylistInfo}>
              <Text style={styles.stylistName}>{serviceDetails.stylist.name}</Text>
              <Text style={styles.stylistExperience}>{serviceDetails.stylist.experience} experience</Text>
              <View style={styles.specialties}>
                {serviceDetails.stylist.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.stylistActions}>
              <TouchableOpacity style={styles.contactButton}>
                <Phone size={16} color="#F43F5E" strokeWidth={2} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <MessageCircle size={16} color="#F43F5E" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
          {serviceDetails.reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewClient}>{review.client}</Text>
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
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.priceAmount}>${serviceDetails.price}</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => router.push('/booking/select-time')}
        >
          <Calendar size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.bookButtonText}>Book Appointment</Text>
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
  serviceInfo: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  businessName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#8B5CF6',
    marginBottom: 4,
  },
  serviceName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 12,
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
  serviceDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  stylistSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  stylistCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  stylistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  stylistInfo: {
    flex: 1,
  },
  stylistName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  stylistExperience: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  specialtyTag: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  specialtyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#F43F5E',
  },
  stylistActions: {
    gap: 8,
  },
  contactButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
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
  reviewClient: {
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
  bookButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});