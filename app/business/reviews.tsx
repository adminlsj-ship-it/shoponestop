import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Star, TrendingUp, MessageCircle, Share, Filter, MoveHorizontal as MoreHorizontal, ThumbsUp, Flag } from 'lucide-react-native';

const reviewsData = {
  averageRating: 4.8,
  totalReviews: 127,
  ratingBreakdown: {
    5: 89,
    4: 28,
    3: 7,
    2: 2,
    1: 1,
  },
};

const reviews = [
  {
    id: '1',
    client: {
      name: 'Emma Wilson',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    rating: 5,
    date: '2024-12-15',
    service: 'Hair Cut & Style',
    comment: 'Absolutely amazing experience! Jessica is incredibly talented and made me feel so comfortable. The salon is beautiful and clean. Will definitely be back!',
    helpful: 12,
    replied: true,
    verified: true,
  },
  {
    id: '2',
    client: {
      name: 'Sofia Martinez',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    rating: 5,
    date: '2024-12-12',
    service: 'Professional Makeup',
    comment: 'Best makeup artist in the city! The attention to detail is incredible and the results lasted all day. Highly recommend for special events.',
    helpful: 8,
    replied: false,
    verified: true,
  },
  {
    id: '3',
    client: {
      name: 'Isabella Chen',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    rating: 4,
    date: '2024-12-10',
    service: 'Full Body Massage',
    comment: 'Great massage and very relaxing atmosphere. The only reason I\'m not giving 5 stars is because the appointment started 15 minutes late.',
    helpful: 5,
    replied: true,
    verified: true,
  },
  {
    id: '4',
    client: {
      name: 'Anonymous',
      image: null,
    },
    rating: 5,
    date: '2024-12-08',
    service: 'Hair Color',
    comment: 'Love my new color! Exactly what I wanted and the process was explained clearly. Professional service.',
    helpful: 3,
    replied: false,
    verified: false,
  },
];

export default function ReviewsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredReviews = reviews.filter(review => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'recent') return new Date(review.date) > new Date('2024-12-01');
    if (selectedFilter === 'high') return review.rating >= 4;
    if (selectedFilter === 'low') return review.rating <= 3;
    if (selectedFilter === 'unreplied') return !review.replied;
    return true;
  });

  const handleReplyToReview = (reviewId: string) => {
    Alert.alert('Reply to Review', 'Review reply feature coming soon!');
  };

  const handleShareReview = (reviewId: string) => {
    Alert.alert('Share Review', 'Review sharing feature coming soon!');
  };

  const handleReportReview = (reviewId: string) => {
    Alert.alert('Report Review', 'Are you sure you want to report this review?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Report', style: 'destructive' },
    ]);
  };

  const renderStars = (rating: number, size: number = 16) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index}
        size={size} 
        color="#F59E0B" 
        fill={index < rating ? "#F59E0B" : "transparent"}
        strokeWidth={2} 
      />
    ));
  };

  const getRatingPercentage = (rating: number) => {
    return (reviewsData.ratingBreakdown[rating] / reviewsData.totalReviews) * 100;
  };

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
          <Text style={styles.title}>Reviews</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={24} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Reviews Overview */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <View style={styles.ratingSection}>
              <Text style={styles.averageRating}>{reviewsData.averageRating}</Text>
              <View style={styles.starsContainer}>
                {renderStars(Math.floor(reviewsData.averageRating), 20)}
              </View>
              <Text style={styles.totalReviews}>{reviewsData.totalReviews} reviews</Text>
            </View>
            
            <View style={styles.trendSection}>
              <TrendingUp size={24} color="#10B981" strokeWidth={2} />
              <Text style={styles.trendText}>+12% this month</Text>
            </View>
          </View>
          
          {/* Rating Breakdown */}
          <View style={styles.ratingBreakdown}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <View key={rating} style={styles.ratingRow}>
                <Text style={styles.ratingNumber}>{rating}</Text>
                <Star size={14} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
                <View style={styles.ratingBar}>
                  <View 
                    style={[
                      styles.ratingBarFill, 
                      { width: `${getRatingPercentage(rating)}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.ratingCount}>{reviewsData.ratingBreakdown[rating]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'all', label: 'All' },
              { key: 'recent', label: 'Recent' },
              { key: 'high', label: '4+ Stars' },
              { key: 'low', label: '3- Stars' },
              { key: 'unreplied', label: 'Unreplied' },
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterTab,
                  selectedFilter === filter.key && styles.filterTabActive
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={[
                  styles.filterTabText,
                  selectedFilter === filter.key && styles.filterTabTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>
            Customer Reviews ({filteredReviews.length})
          </Text>
          
          {filteredReviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.clientInfo}>
                  {review.client.image ? (
                    <Image source={{ uri: review.client.image }} style={styles.clientImage} />
                  ) : (
                    <View style={styles.clientImagePlaceholder}>
                      <Text style={styles.clientInitial}>
                        {review.client.name.charAt(0)}
                      </Text>
                    </View>
                  )}
                  <View style={styles.clientDetails}>
                    <View style={styles.clientNameRow}>
                      <Text style={styles.clientName}>{review.client.name}</Text>
                      {review.verified && (
                        <View style={styles.verifiedBadge}>
                          <Text style={styles.verifiedText}>✓</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                    <Text style={styles.reviewService}>{review.service}</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.moreButton}>
                  <MoreHorizontal size={20} color="#9CA3AF" strokeWidth={2} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.reviewRating}>
                {renderStars(review.rating)}
              </View>
              
              <Text style={styles.reviewComment}>{review.comment}</Text>
              
              <View style={styles.reviewActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <ThumbsUp size={16} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.actionText}>Helpful ({review.helpful})</Text>
                </TouchableOpacity>
                
                {!review.replied && (
                  <TouchableOpacity 
                    style={styles.replyButton}
                    onPress={() => handleReplyToReview(review.id)}
                  >
                    <MessageCircle size={16} color="#F43F5E" strokeWidth={2} />
                    <Text style={styles.replyButtonText}>Reply</Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleShareReview(review.id)}
                >
                  <Share size={16} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleReportReview(review.id)}
                >
                  <Flag size={16} color="#EF4444" strokeWidth={2} />
                </TouchableOpacity>
              </View>
              
              {review.replied && (
                <View style={styles.businessReply}>
                  <Text style={styles.replyLabel}>Business Reply:</Text>
                  <Text style={styles.replyText}>
                    Thank you so much for your kind words! We're thrilled you had a great experience and look forward to seeing you again soon! 💕
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Review Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Review Insights</Text>
          
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Most Mentioned</Text>
            <View style={styles.keywordTags}>
              <View style={styles.keywordTag}>
                <Text style={styles.keywordText}>Professional</Text>
              </View>
              <View style={styles.keywordTag}>
                <Text style={styles.keywordText}>Clean</Text>
              </View>
              <View style={styles.keywordTag}>
                <Text style={styles.keywordText}>Talented</Text>
              </View>
              <View style={styles.keywordTag}>
                <Text style={styles.keywordText}>Comfortable</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Response Rate</Text>
            <Text style={styles.insightValue}>75%</Text>
            <Text style={styles.insightDescription}>
              You've replied to 75% of your reviews. Consider responding to more reviews to improve customer engagement.
            </Text>
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
  filterButton: {
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
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingSection: {
    alignItems: 'center',
  },
  averageRating: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: '#111827',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  totalReviews: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  trendSection: {
    alignItems: 'center',
    gap: 8,
  },
  trendText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#10B981',
  },
  ratingBreakdown: {
    gap: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    width: 12,
  },
  ratingBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
  },
  ratingCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    width: 24,
    textAlign: 'right',
  },
  filterTabs: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  filterTab: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: '#F43F5E',
  },
  filterTabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  reviewsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  clientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  clientImagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  clientInitial: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#6B7280',
  },
  clientDetails: {
    flex: 1,
  },
  clientNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  verifiedBadge: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  reviewService: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8B5CF6',
  },
  moreButton: {
    padding: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 12,
  },
  reviewComment: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  reviewActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  replyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#F43F5E',
  },
  businessReply: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#F43F5E',
  },
  replyLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#F43F5E',
    marginBottom: 6,
  },
  replyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  insightsSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  insightCard: {
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
  insightTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  keywordTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordTag: {
    backgroundColor: '#F3E8FF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  keywordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
  },
  insightValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#F43F5E',
    marginBottom: 8,
  },
  insightDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});