import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  User, 
  Settings, 
  Bell, 
  CreditCard, 
  MapPin, 
  Star, 
  Crown, 
  Briefcase,
  ChevronRight,
  LogOut,
  Plus,
  Users,
  TrendingUp,
  Percent,
  ExternalLink
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useStripe } from '@/hooks/useStripe';

export default function ProfileScreen() {
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { user, signOut } = useAuth();
  const { getCurrentPlan, isSubscriptionActive } = useStripe();

  const currentPlan = getCurrentPlan();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/auth/welcome');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Plus size={16} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>
            {user ? `${user.first_name} ${user.last_name}` : 'Loading...'}
          </Text>
          <Text style={styles.userEmail}>{user?.email || 'Loading...'}</Text>
          
          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentPlan.name}</Text>
              <Text style={styles.statLabel}>Current Plan</Text>
            </View>
          </View>
        </View>

        {/* Account Type Toggle */}
        <View style={styles.section}>
          <View style={styles.accountTypeCard}>
            <View style={styles.accountTypeHeader}>
              <View style={styles.accountTypeInfo}>
                <Briefcase size={20} color="#8B5CF6" strokeWidth={2} />
                <Text style={styles.accountTypeTitle}>Business Account</Text>
              </View>
              <Switch
                value={isBusinessAccount}
                onValueChange={setIsBusinessAccount}
                trackColor={{ false: '#E5E7EB', true: '#F43F5E' }}
                thumbColor={isBusinessAccount ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            <Text style={styles.accountTypeDesc}>
              {isBusinessAccount 
                ? 'Manage your beauty business and bookings'
                : 'Switch to manage your beauty business'
              }
            </Text>
            {isBusinessAccount && !isSubscriptionActive() && (
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() => router.push('/business/membership')}
              >
                <Crown size={16} color="#F59E0B" strokeWidth={2} />
                <Text style={styles.upgradeButtonText}>Upgrade to Pro</Text>
              </TouchableOpacity>
            )}
            {isBusinessAccount && isSubscriptionActive() && (
              <View style={styles.activePlanBadge}>
                <Crown size={16} color="#10B981" strokeWidth={2} />
                <Text style={styles.activePlanText}>
                  Active: {currentPlan.name} ({currentPlan.price})
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Business Dashboard (only shown if business account) */}
        {isBusinessAccount && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Dashboard</Text>
            <View style={styles.businessStats}>
              <View style={styles.businessStatCard}>
                <Text style={styles.businessStatNumber}>127</Text>
                <Text style={styles.businessStatLabel}>Total Bookings</Text>
              </View>
              <View style={styles.businessStatCard}>
                <Text style={styles.businessStatNumber}>$5,240</Text>
                <Text style={styles.businessStatLabel}>This Month</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/business/dashboard')}
            >
              <View style={styles.menuItemLeft}>
                <Settings size={20} color="#6B7280" strokeWidth={2} />
                <Text style={styles.menuItemText}>Business Dashboard</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/business/services')}
            >
              <View style={styles.menuItemLeft}>
                <Settings size={20} color="#6B7280" strokeWidth={2} />
                <Text style={styles.menuItemText}>Manage Services</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/business/calendar')}
            >
              <View style={styles.menuItemLeft}>
                <Bell size={20} color="#6B7280" strokeWidth={2} />
                <Text style={styles.menuItemText}>Availability Calendar</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        )}

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <User size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <MapPin size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Addresses</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <CreditCard size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Payment Methods</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Bell size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Manage Calendar</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
            
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/business/clients')}
          >
            <View style={styles.menuItemLeft}>
              <Users size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Client Management</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
            
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/business/marketing')}
          >
            <View style={styles.menuItemLeft}>
              <TrendingUp size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Marketing Suite</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
            
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/business/earnings')}
          >
            <View style={styles.menuItemLeft}>
              <CreditCard size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Earnings & Reports</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
            
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/business/payments')}
          >
            <View style={styles.menuItemLeft}>
              <CreditCard size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Payments & Policies</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
            
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/business/reviews')}
          >
            <View style={styles.menuItemLeft}>
              <Star size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Reviews</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
            
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/business/media')}
          >
            <View style={styles.menuItemLeft}>
              <Settings size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Media Gallery</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E7EB', true: '#F43F5E' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/business/help')}
          >
            <View style={styles.menuItemLeft}>
              <Settings size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Star size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Rate the App</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/business/help')}
          >
            <View style={styles.menuItemLeft}>
              <Settings size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
            
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/business/public-profile')}
          >
            <View style={styles.menuItemLeft}>
              <ExternalLink size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Public Profile & URL</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
            
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/business/promotions')}
          >
            <View style={styles.menuItemLeft}>
              <Percent size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.menuItemText}>Promotions & Offers</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <LogOut size={20} color="#EF4444" strokeWidth={2} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  accountTypeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  accountTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  accountTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountTypeTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  accountTypeDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  upgradeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#D97706',
  },
  activePlanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  activePlanText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#166534',
  },
  businessStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  businessStatCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  businessStatNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#F43F5E',
    marginBottom: 4,
  },
  businessStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  menuItem: {
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
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#EF4444',
  },
});