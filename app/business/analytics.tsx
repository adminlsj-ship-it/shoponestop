import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Calendar, DollarSign, Clock, Star, ChartBar as BarChart3, ChartPie as PieChart, Activity } from 'lucide-react-native';

const analyticsData = {
  overview: {
    totalBookings: 127,
    totalRevenue: 15240,
    averageBookingValue: 120,
    clientRetentionRate: 78,
    growth: {
      bookings: 12.5,
      revenue: 18.3,
      clients: 8.7,
      retention: -2.1,
    },
  },
  bookingTrends: [
    { month: 'Jan', bookings: 89, revenue: 10680 },
    { month: 'Feb', bookings: 95, revenue: 11400 },
    { month: 'Mar', bookings: 102, revenue: 12240 },
    { month: 'Apr', bookings: 98, revenue: 11760 },
    { month: 'May', bookings: 108, revenue: 12960 },
    { month: 'Jun', bookings: 115, revenue: 13800 },
    { month: 'Jul', bookings: 122, revenue: 14640 },
    { month: 'Aug', bookings: 118, revenue: 14160 },
    { month: 'Sep', bookings: 125, revenue: 15000 },
    { month: 'Oct', bookings: 132, revenue: 15840 },
    { month: 'Nov', bookings: 128, revenue: 15360 },
    { month: 'Dec', bookings: 127, revenue: 15240 },
  ],
  serviceBreakdown: [
    { service: 'Hair Cut & Style', bookings: 45, revenue: 3825, percentage: 35 },
    { service: 'Hair Color', bookings: 32, revenue: 4800, percentage: 25 },
    { service: 'Makeup', bookings: 28, revenue: 3360, percentage: 22 },
    { service: 'Spa Treatment', bookings: 22, revenue: 3300, percentage: 18 },
  ],
  peakHours: [
    { hour: '9 AM', bookings: 8 },
    { hour: '10 AM', bookings: 12 },
    { hour: '11 AM', bookings: 15 },
    { hour: '12 PM', bookings: 18 },
    { hour: '1 PM', bookings: 14 },
    { hour: '2 PM', bookings: 22 },
    { hour: '3 PM', bookings: 19 },
    { hour: '4 PM', bookings: 16 },
    { hour: '5 PM', bookings: 13 },
    { hour: '6 PM', bookings: 10 },
  ],
};

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedTab, setSelectedTab] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? (
      <TrendingUp size={16} color="#10B981" strokeWidth={2} />
    ) : (
      <TrendingDown size={16} color="#EF4444" strokeWidth={2} />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? '#10B981' : '#EF4444';
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
          <Text style={styles.title}>Analytics</Text>
          <TouchableOpacity style={styles.chartButton}>
            <BarChart3 size={24} color="#F43F5E" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View style={styles.periodContainer}>
          {['week', 'month', 'quarter', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Calendar size={20} color="#F43F5E" strokeWidth={2} />
              <View style={styles.growthIndicator}>
                {getGrowthIcon(analyticsData.overview.growth.bookings)}
                <Text style={[
                  styles.growthText,
                  { color: getGrowthColor(analyticsData.overview.growth.bookings) }
                ]}>
                  {analyticsData.overview.growth.bookings}%
                </Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>{analyticsData.overview.totalBookings}</Text>
            <Text style={styles.metricLabel}>Total Bookings</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <DollarSign size={20} color="#10B981" strokeWidth={2} />
              <View style={styles.growthIndicator}>
                {getGrowthIcon(analyticsData.overview.growth.revenue)}
                <Text style={[
                  styles.growthText,
                  { color: getGrowthColor(analyticsData.overview.growth.revenue) }
                ]}>
                  {analyticsData.overview.growth.revenue}%
                </Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>{formatCurrency(analyticsData.overview.totalRevenue)}</Text>
            <Text style={styles.metricLabel}>Total Revenue</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Users size={20} color="#8B5CF6" strokeWidth={2} />
              <View style={styles.growthIndicator}>
                {getGrowthIcon(analyticsData.overview.growth.retention)}
                <Text style={[
                  styles.growthText,
                  { color: getGrowthColor(analyticsData.overview.growth.retention) }
                ]}>
                  {Math.abs(analyticsData.overview.growth.retention)}%
                </Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>{analyticsData.overview.clientRetentionRate}%</Text>
            <Text style={styles.metricLabel}>Client Retention</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Star size={20} color="#F59E0B" strokeWidth={2} />
              <View style={styles.growthIndicator}>
                {getGrowthIcon(analyticsData.overview.growth.clients)}
                <Text style={[
                  styles.growthText,
                  { color: getGrowthColor(analyticsData.overview.growth.clients) }
                ]}>
                  {analyticsData.overview.growth.clients}%
                </Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>{formatCurrency(analyticsData.overview.averageBookingValue)}</Text>
            <Text style={styles.metricLabel}>Avg. Booking Value</Text>
          </View>
        </View>

        {/* Revenue Trend Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Revenue Trend</Text>
            <TouchableOpacity>
              <Activity size={20} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.chart}>
            {analyticsData.bookingTrends.map((item, index) => {
              const maxRevenue = Math.max(...analyticsData.bookingTrends.map(t => t.revenue));
              const height = (item.revenue / maxRevenue) * 100;
              
              return (
                <View key={index} style={styles.chartBar}>
                  <View style={[styles.revenueBar, { height: `${height}%` }]} />
                  <Text style={styles.chartLabel}>{item.month}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Service Breakdown */}
        <View style={styles.serviceSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Service Performance</Text>
            <PieChart size={20} color="#6B7280" strokeWidth={2} />
          </View>
          
          {analyticsData.serviceBreakdown.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.service}</Text>
                <Text style={styles.serviceStats}>
                  {service.bookings} bookings • {formatCurrency(service.revenue)}
                </Text>
              </View>
              
              <View style={styles.serviceMetrics}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${service.percentage}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.servicePercentage}>{service.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Peak Hours */}
        <View style={styles.peakHoursSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Peak Booking Hours</Text>
            <Clock size={20} color="#6B7280" strokeWidth={2} />
          </View>
          
          <View style={styles.peakHoursChart}>
            {analyticsData.peakHours.map((hour, index) => {
              const maxBookings = Math.max(...analyticsData.peakHours.map(h => h.bookings));
              const height = (hour.bookings / maxBookings) * 100;
              
              return (
                <View key={index} style={styles.hourBar}>
                  <View style={[styles.hourBarFill, { height: `${height}%` }]} />
                  <Text style={styles.hourLabel}>{hour.hour}</Text>
                  <Text style={styles.hourValue}>{hour.bookings}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Key Insights</Text>
          
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <TrendingUp size={20} color="#10B981" strokeWidth={2} />
              <Text style={styles.insightTitle}>Revenue Growth</Text>
            </View>
            <Text style={styles.insightText}>
              Your revenue has increased by 18.3% this month. Hair color services are your top revenue generator.
            </Text>
          </View>
          
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Clock size={20} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.insightTitle}>Peak Performance</Text>
            </View>
            <Text style={styles.insightText}>
              Your busiest time is 2 PM with 22 bookings. Consider adjusting your schedule to accommodate demand.
            </Text>
          </View>
          
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Users size={20} color="#8B5CF6" strokeWidth={2} />
              <Text style={styles.insightTitle}>Client Retention</Text>
            </View>
            <Text style={styles.insightText}>
              Client retention is at 78%. Focus on follow-up communications to improve repeat bookings.
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
  chartButton: {
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
  periodContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    margin: 20,
    borderRadius: 16,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  periodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  periodTextActive: {
    color: '#F43F5E',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  growthIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  growthText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  metricNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 4,
  },
  metricLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  chartSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    gap: 8,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  revenueBar: {
    backgroundColor: '#F43F5E',
    width: '100%',
    borderRadius: 4,
    minHeight: 8,
  },
  chartLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 8,
  },
  serviceSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceItem: {
    marginBottom: 16,
  },
  serviceInfo: {
    marginBottom: 8,
  },
  serviceName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  serviceStats: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  serviceMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F43F5E',
  },
  servicePercentage: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    width: 40,
    textAlign: 'right',
  },
  peakHoursSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  peakHoursChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    gap: 4,
  },
  hourBar: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  hourBarFill: {
    backgroundColor: '#8B5CF6',
    width: '100%',
    borderRadius: 2,
    minHeight: 4,
  },
  hourLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 8,
    color: '#9CA3AF',
    marginTop: 4,
    transform: [{ rotate: '-45deg' }],
  },
  hourValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#111827',
    marginTop: 2,
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
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  insightTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  insightText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});