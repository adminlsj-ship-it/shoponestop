import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, Calendar, DollarSign, MessageCircle, Star, Users, Package, Settings } from 'lucide-react-native';

const notifications = [
  {
    id: '1',
    type: 'booking',
    title: 'New Booking',
    message: 'Emma Wilson booked Hair Cut & Style for Dec 24, 2:00 PM',
    timestamp: '2 minutes ago',
    read: false,
    icon: Calendar,
    color: '#F43F5E',
  },
  {
    id: '2',
    type: 'sale',
    title: 'Product Sale',
    message: 'Sofia Martinez purchased Luxury Hydrating Serum - $89',
    timestamp: '1 hour ago',
    read: false,
    icon: DollarSign,
    color: '#10B981',
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    message: 'Isabella Chen: "Thank you for the amazing service!"',
    timestamp: '3 hours ago',
    read: true,
    icon: MessageCircle,
    color: '#8B5CF6',
  },
  {
    id: '4',
    type: 'review',
    title: 'New Review',
    message: 'You received a 5-star review from Emma Wilson',
    timestamp: '5 hours ago',
    read: true,
    icon: Star,
    color: '#F59E0B',
  },
  {
    id: '5',
    type: 'booking',
    title: 'Booking Cancelled',
    message: 'Michael Brown cancelled appointment for Dec 23, 11:00 AM',
    timestamp: '1 day ago',
    read: true,
    icon: Calendar,
    color: '#EF4444',
  },
  {
    id: '6',
    type: 'client',
    title: 'New Client',
    message: 'Jessica Taylor created an account and is browsing your services',
    timestamp: '2 days ago',
    read: true,
    icon: Users,
    color: '#06B6D4',
  },
];

const notificationSettings = {
  bookings: true,
  sales: true,
  messages: true,
  reviews: true,
  marketing: false,
  reminders: true,
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
};

export default function NotificationsScreen() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [settings, setSettings] = useState(notificationSettings);

  const filteredNotifications = notifications.filter(notification => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'unread') return !notification.read;
    return notification.type === selectedTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
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
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: 'Unread' },
            { key: 'booking', label: 'Bookings' },
            { key: 'sale', label: 'Sales' },
            { key: 'message', label: 'Messages' },
            { key: 'review', label: 'Reviews' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                selectedTab === tab.key && styles.activeTab
              ]}
              onPress={() => setSelectedTab(tab.key)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab.key && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionText}>Mark All as Read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <View style={styles.notificationsList}>
          {filteredNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.unreadNotification
                ]}
              >
                <View style={[styles.iconContainer, { backgroundColor: notification.color + '20' }]}>
                  <IconComponent size={20} color={notification.color} strokeWidth={2} />
                </View>
                
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
                </View>
                
                {!notification.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notification Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          
          <View style={styles.settingsCard}>
            <Text style={styles.settingsCardTitle}>Types</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Calendar size={20} color="#F43F5E" strokeWidth={2} />
                <Text style={styles.settingLabel}>Booking Notifications</Text>
              </View>
              <Switch
                value={settings.bookings}
                onValueChange={() => toggleSetting('bookings')}
                trackColor={{ false: '#E5E7EB', true: '#F43F5E' }}
                thumbColor={settings.bookings ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <DollarSign size={20} color="#10B981" strokeWidth={2} />
                <Text style={styles.settingLabel}>Sales Notifications</Text>
              </View>
              <Switch
                value={settings.sales}
                onValueChange={() => toggleSetting('sales')}
                trackColor={{ false: '#E5E7EB', true: '#F43F5E' }}
                thumbColor={settings.sales ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MessageCircle size={20} color="#8B5CF6" strokeWidth={2} />
                <Text style={styles.settingLabel}>Message Notifications</Text>
              </View>
              <Switch
                value={settings.messages}
                onValueChange={() => toggleSetting('messages')}
                trackColor={{ false: '#E5E7EB', true: '#F43F5E' }}
                thumbColor={settings.messages ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Star size={20} color="#F59E0B" strokeWidth={2} />
                <Text style={styles.settingLabel}>Review Notifications</Text>
              </View>
              <Switch
                value={settings.reviews}
                onValueChange={() => toggleSetting('reviews')}
                trackColor={{ false: '#E5E7EB', true: '#F43F5E' }}
                thumbColor={settings.reviews ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          </View>
          
          <View style={styles.settingsCard}>
            <Text style={styles.settingsCardTitle}>Delivery Methods</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Switch
                value={settings.pushNotifications}
                onValueChange={() => toggleSetting('pushNotifications')}
                trackColor={{ false: '#E5E7EB', true: '#F43F5E' }}
                thumbColor={settings.pushNotifications ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Email Notifications</Text>
              <Switch
                value={settings.emailNotifications}
                onValueChange={() => toggleSetting('emailNotifications')}
                trackColor={{ false: '#E5E7EB', true: '#F43F5E' }}
                thumbColor={settings.emailNotifications ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>SMS Notifications</Text>
              <Switch
                value={settings.smsNotifications}
                onValueChange={() => toggleSetting('smsNotifications')}
                trackColor={{ false: '#E5E7EB', true: '#F43F5E' }}
                thumbColor={settings.smsNotifications ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
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
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
  },
  unreadBadge: {
    backgroundColor: '#F43F5E',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  settingsButton: {
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
  tabContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  tab: {
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
  activeTab: {
    backgroundColor: '#F43F5E',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  quickAction: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#F43F5E',
  },
  notificationsList: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#F43F5E',
  },
  iconContainer: {
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  notificationMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTimestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F43F5E',
    marginTop: 8,
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  settingsCard: {
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
  settingsCardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
  },
});