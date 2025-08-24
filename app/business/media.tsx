import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Plus, Camera, Video, Upload, Grid3x3 as Grid3X3, List, Play, CreditCard as Edit, Trash2, Share, Eye, Heart } from 'lucide-react-native';

const mediaItems = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumbnail: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Hair Transformation',
    description: 'Beautiful balayage highlights on long hair',
    category: 'Hair Styling',
    uploadDate: '2024-12-15',
    views: 245,
    likes: 18,
    featured: true,
  },
  {
    id: '2',
    type: 'video',
    url: 'https://example.com/video1.mp4',
    thumbnail: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Makeup Tutorial',
    description: 'Step-by-step bridal makeup application',
    category: 'Makeup',
    uploadDate: '2024-12-12',
    duration: '3:45',
    views: 189,
    likes: 24,
    featured: false,
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumbnail: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Relaxing Spa Day',
    description: 'Peaceful spa environment with aromatherapy',
    category: 'Spa',
    uploadDate: '2024-12-10',
    views: 156,
    likes: 12,
    featured: false,
  },
  {
    id: '4',
    type: 'video',
    url: 'https://example.com/video2.mp4',
    thumbnail: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Hair Cutting Technique',
    description: 'Professional layering technique demonstration',
    category: 'Hair Styling',
    uploadDate: '2024-12-08',
    duration: '2:30',
    views: 312,
    likes: 31,
    featured: true,
  },
];

const categories = ['All', 'Hair Styling', 'Makeup', 'Spa', 'Nails', 'Skincare'];

export default function MediaScreen() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const filteredMedia = mediaItems.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const handleUploadMedia = () => {
    Alert.alert(
      'Upload Media',
      'Choose upload type',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: () => Alert.alert('Camera', 'Camera feature coming soon!') },
        { text: 'Record Video', onPress: () => Alert.alert('Video', 'Video recording coming soon!') },
        { text: 'Upload from Gallery', onPress: () => Alert.alert('Gallery', 'Gallery upload coming soon!') },
      ]
    );
  };

  const handleEditMedia = (mediaId: string) => {
    Alert.alert('Edit Media', 'Media editing feature coming soon!');
  };

  const handleDeleteMedia = (mediaId: string) => {
    Alert.alert(
      'Delete Media',
      'Are you sure you want to delete this media?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          Alert.alert('Success', 'Media deleted successfully!');
        }},
      ]
    );
  };

  const handleShareMedia = (mediaId: string) => {
    Alert.alert('Share Media', 'Media sharing feature coming soon!');
  };

  const renderGridView = () => (
    <View style={styles.gridContainer}>
      {filteredMedia.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.gridItem}
          onPress={() => setSelectedMedia(item.id)}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.gridImage} />
          {item.type === 'video' && (
            <View style={styles.videoOverlay}>
              <Play size={20} color="#FFFFFF" fill="#FFFFFF" strokeWidth={2} />
              <Text style={styles.videoDuration}>{item.duration}</Text>
            </View>
          )}
          {item.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>★</Text>
            </View>
          )}
          <View style={styles.gridStats}>
            <View style={styles.gridStat}>
              <Eye size={12} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.gridStatText}>{item.views}</Text>
            </View>
            <View style={styles.gridStat}>
              <Heart size={12} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.gridStatText}>{item.likes}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderListView = () => (
    <View style={styles.listContainer}>
      {filteredMedia.map((item) => (
        <View key={item.id} style={styles.listItem}>
          <Image source={{ uri: item.thumbnail }} style={styles.listImage} />
          {item.type === 'video' && (
            <View style={styles.listVideoOverlay}>
              <Play size={16} color="#FFFFFF" fill="#FFFFFF" strokeWidth={2} />
            </View>
          )}
          
          <View style={styles.listContent}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>{item.title}</Text>
              {item.featured && (
                <View style={styles.listFeaturedBadge}>
                  <Text style={styles.listFeaturedText}>Featured</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.listDescription}>{item.description}</Text>
            <Text style={styles.listCategory}>{item.category}</Text>
            
            <View style={styles.listStats}>
              <Text style={styles.listDate}>{item.uploadDate}</Text>
              <View style={styles.listStatGroup}>
                <View style={styles.listStat}>
                  <Eye size={14} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.listStatText}>{item.views}</Text>
                </View>
                <View style={styles.listStat}>
                  <Heart size={14} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.listStatText}>{item.likes}</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.listActions}>
            <TouchableOpacity 
              style={styles.listActionButton}
              onPress={() => handleEditMedia(item.id)}
            >
              <Edit size={16} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.listActionButton}
              onPress={() => handleShareMedia(item.id)}
            >
              <Share size={16} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.listActionButton}
              onPress={() => handleDeleteMedia(item.id)}
            >
              <Trash2 size={16} color="#EF4444" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

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
        <Text style={styles.title}>Media Gallery</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadMedia}>
          <Plus size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Camera size={20} color="#F43F5E" strokeWidth={2} />
          <Text style={styles.statNumber}>{mediaItems.filter(item => item.type === 'image').length}</Text>
          <Text style={styles.statLabel}>Photos</Text>
        </View>
        <View style={styles.statCard}>
          <Video size={20} color="#8B5CF6" strokeWidth={2} />
          <Text style={styles.statNumber}>{mediaItems.filter(item => item.type === 'video').length}</Text>
          <Text style={styles.statLabel}>Videos</Text>
        </View>
        <View style={styles.statCard}>
          <Eye size={20} color="#10B981" strokeWidth={2} />
          <Text style={styles.statNumber}>{mediaItems.reduce((sum, item) => sum + item.views, 0)}</Text>
          <Text style={styles.statLabel}>Total Views</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipSelected
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextSelected
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'grid' && styles.viewButtonActive]}
            onPress={() => setViewMode('grid')}
          >
            <Grid3X3 size={20} color={viewMode === 'grid' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'list' && styles.viewButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <List size={20} color={viewMode === 'list' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Upload Options */}
      <View style={styles.uploadOptions}>
        <TouchableOpacity style={styles.uploadOption} onPress={handleUploadMedia}>
          <Camera size={20} color="#F43F5E" strokeWidth={2} />
          <Text style={styles.uploadOptionText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadOption} onPress={handleUploadMedia}>
          <Video size={20} color="#8B5CF6" strokeWidth={2} />
          <Text style={styles.uploadOptionText}>Record Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadOption} onPress={handleUploadMedia}>
          <Upload size={20} color="#10B981" strokeWidth={2} />
          <Text style={styles.uploadOptionText}>Upload Files</Text>
        </TouchableOpacity>
      </View>

      {/* Media Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {viewMode === 'grid' ? renderGridView() : renderListView()}
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
  uploadButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
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
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 16,
  },
  categoriesScroll: {
    flex: 1,
  },
  categoryChip: {
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
  categoryChipSelected: {
    backgroundColor: '#F43F5E',
  },
  categoryChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
  },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonActive: {
    backgroundColor: '#F43F5E',
  },
  uploadOptions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  uploadOption: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#374151',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 40,
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  videoDuration: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gridStats: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridStat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 4,
  },
  gridStatText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  listContainer: {
    paddingBottom: 40,
  },
  listItem: {
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
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  listVideoOverlay: {
    position: 'absolute',
    left: 32,
    top: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  listTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  listFeaturedBadge: {
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  listFeaturedText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  listDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  listCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
    marginBottom: 8,
  },
  listStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  listStatGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  listStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listStatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  listActions: {
    flexDirection: 'row',
    gap: 8,
  },
  listActionButton: {
    padding: 8,
  },
});