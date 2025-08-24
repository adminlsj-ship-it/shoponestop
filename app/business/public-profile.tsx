import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Link, Copy, Share as ShareIcon, Eye, CreditCard as Edit, QrCode, ExternalLink } from 'lucide-react-native';

export default function PublicProfileScreen() {
  const [customUrl, setCustomUrl] = useState('luxe-hair-studio');
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(customUrl);

  const businessData = {
    name: 'Luxe Hair Studio',
    description: 'Premium hair styling and beauty services in Beverly Hills',
    rating: 4.9,
    reviews: 127,
    location: 'Beverly Hills, CA',
  };

  const fullUrl = `https://shoponestop.net/${customUrl}`;

  const handleSaveUrl = () => {
    if (!tempUrl.trim()) {
      Alert.alert('Error', 'URL cannot be empty');
      return;
    }
    
    // Validate URL format
    const urlRegex = /^[a-z0-9-]+$/;
    if (!urlRegex.test(tempUrl)) {
      Alert.alert('Error', 'URL can only contain lowercase letters, numbers, and hyphens');
      return;
    }

    setCustomUrl(tempUrl);
    setIsEditing(false);
    Alert.alert('Success', 'Your custom URL has been updated!');
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      Alert.alert('Copied!', 'URL copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy URL');
    }
  };

  const handleShareUrl = async () => {
    try {
      await Share.share({
        message: `Book your appointment at ${businessData.name}: ${fullUrl}`,
        url: fullUrl,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share URL');
    }
  };

  const handlePreviewProfile = () => {
    Alert.alert('Preview', 'Opening public profile preview...');
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
          <Text style={styles.title}>Public Profile</Text>
          <TouchableOpacity style={styles.previewButton} onPress={handlePreviewProfile}>
            <Eye size={24} color="#F43F5E" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Custom URL Section */}
        <View style={styles.urlSection}>
          <Text style={styles.sectionTitle}>Your Custom URL</Text>
          <Text style={styles.sectionDescription}>
            Share this link with clients for direct booking and shopping
          </Text>
          
          <View style={styles.urlCard}>
            <View style={styles.urlDisplay}>
              <Text style={styles.urlPrefix}>beautybook.app/</Text>
              {isEditing ? (
                <TextInput
                  style={styles.urlInput}
                  value={tempUrl}
                  onChangeText={setTempUrl}
                  placeholder="your-business-name"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              ) : (
                <Text style={styles.urlCustom}>{customUrl}</Text>
              )}
            </View>
            
            <View style={styles.urlActions}>
              {isEditing ? (
                <>
                  <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={handleSaveUrl}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => {
                      setIsEditing(false);
                      setTempUrl(customUrl);
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => setIsEditing(true)}
                  >
                    <Edit size={16} color="#6B7280" strokeWidth={2} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleCopyUrl}
                  >
                    <Copy size={16} color="#6B7280" strokeWidth={2} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleShareUrl}
                  >
                    <ShareIcon size={16} color="#6B7280" strokeWidth={2} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          
          <View style={styles.fullUrlDisplay}>
            <Link size={16} color="#8B5CF6" strokeWidth={2} />
            <Text style={styles.fullUrlText}>{fullUrl}</Text>
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrSection}>
          <Text style={styles.sectionTitle}>QR Code</Text>
          <View style={styles.qrCard}>
            <View style={styles.qrPlaceholder}>
              <QrCode size={48} color="#9CA3AF" strokeWidth={2} />
              <Text style={styles.qrText}>QR Code for shoponestop.net/{customUrl}</Text>
            </View>
            <TouchableOpacity style={styles.downloadQrButton}>
              <Text style={styles.downloadQrText}>Download QR Code</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Preview */}
        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>Profile Preview</Text>
          <View style={styles.previewCard}>
            <Text style={styles.previewBusinessName}>{businessData.name}</Text>
            <Text style={styles.previewDescription}>{businessData.description}</Text>
            <View style={styles.previewStats}>
              <Text style={styles.previewRating}>⭐ {businessData.rating} ({businessData.reviews} reviews)</Text>
              <Text style={styles.previewLocation}>📍 {businessData.location}</Text>
            </View>
            <TouchableOpacity style={styles.previewBookButton}>
              <Text style={styles.previewBookText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Profile Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Online Booking</Text>
            <Text style={styles.settingValue}>Enabled</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Retail Shopping</Text>
            <Text style={styles.settingValue}>Enabled</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Show Reviews</Text>
            <Text style={styles.settingValue}>Public</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Contact Information</Text>
            <Text style={styles.settingValue}>Visible</Text>
          </TouchableOpacity>
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
  previewButton: {
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
  urlSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  urlCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  urlDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  urlPrefix: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  urlCustom: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  urlInput: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    flex: 1,
    padding: 0,
  },
  urlActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 8,
  },
  saveButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B7280',
  },
  fullUrlDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 12,
    gap: 8,
  },
  fullUrlText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8B5CF6',
    flex: 1,
  },
  qrSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  qrPlaceholder: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
  },
  downloadQrButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  downloadQrText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  previewSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  previewBusinessName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 8,
  },
  previewDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  previewStats: {
    marginBottom: 16,
  },
  previewRating: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  previewLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  previewBookButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  previewBookText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
  },
  settingValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#10B981',
  },
});