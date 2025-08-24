import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Calendar, CreditCard, ChartPie as PieChart, ChartBar as BarChart3, Download } from 'lucide-react-native';

const earningsData = {
  today: 340,
  thisWeek: 1850,
  thisMonth: 7240,
  thisYear: 68500,
  growth: {
    daily: 12.5,
    weekly: 8.3,
    monthly: 15.7,
    yearly: 23.4,
  },
};

const recentTransactions = [
  {
    id: '1',
    client: 'Emma Wilson',
    service: 'Hair Cut & Style',
    amount: 85,
    date: '2024-12-18',
    time: '2:30 PM',
    status: 'completed',
  },
  {
    id: '2',
    client: 'Sofia Martinez',
    service: 'Professional Makeup',
    amount: 120,
    date: '2024-12-18',
    time: '11:00 AM',
    status: 'completed',
  },
  {
    id: '3',
    client: 'Isabella Chen',
    service: 'Full Body Massage',
    amount: 150,
    date: '2024-12-17',
    time: '4:00 PM',
    status: 'completed',
  },
];

const monthlyBreakdown = [
  { month: 'Jan', amount: 5200 },
  { month: 'Feb', amount: 5800 },
  { month: 'Mar', amount: 6100 },
  { month: 'Apr', amount: 5900 },
  { month: 'May', amount: 6400 },
  { month: 'Jun', amount: 6800 },
  { month: 'Jul', amount: 7100 },
  { month: 'Aug', amount: 6900 },
  { month: 'Sep', amount: 7300 },
  { month: 'Oct', amount: 7600 },
  { month: 'Nov', amount: 7100 },
  { month: 'Dec', amount: 7240 },
];

export default function EarningsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

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
          <Text style={styles.title}>Earnings & Reports</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Download size={24} color="#F43F5E" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View style={styles.periodContainer}>
          {['day', 'week', 'month', 'year'].map((period) => (
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

        {/* Main Earnings Card */}
        <View style={styles.mainEarningsCard}>
          <View style={styles.earningsHeader}>
            <DollarSign size={32} color="#F43F5E" strokeWidth={2} />
            <View style={styles.earningsInfo}>
              <Text style={styles.earningsLabel}>
                {selectedPeriod === 'day' ? 'Today' :
                 selectedPeriod === 'week' ? 'This Week' :
                 selectedPeriod === 'month' ? 'This Month' : 'This Year'}
              </Text>
              <Text style={styles.earningsAmount}>
                {formatCurrency(
                  selectedPeriod === 'day' ? earningsData.today :
                  selectedPeriod === 'week' ? earningsData.thisWeek :
                  selectedPeriod === 'month' ? earningsData.thisMonth :
                  earningsData.thisYear
                )}
              </Text>
            </View>
          </View>
          
          <View style={styles.growthContainer}>
            {getGrowthIcon(
              selectedPeriod === 'day' ? earningsData.growth.daily :
              selectedPeriod === 'week' ? earningsData.growth.weekly :
              selectedPeriod === 'month' ? earningsData.growth.monthly :
              earningsData.growth.yearly
            )}
            <Text style={[
              styles.growthText,
              { color: getGrowthColor(
                selectedPeriod === 'day' ? earningsData.growth.daily :
                selectedPeriod === 'week' ? earningsData.growth.weekly :
                selectedPeriod === 'month' ? earningsData.growth.monthly :
                earningsData.growth.yearly
              )}
            ]}>
              {selectedPeriod === 'day' ? earningsData.growth.daily :
               selectedPeriod === 'week' ? earningsData.growth.weekly :
               selectedPeriod === 'month' ? earningsData.growth.monthly :
               earningsData.growth.yearly}% vs last {selectedPeriod}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <Calendar size={20} color="#8B5CF6" strokeWidth={2} />
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Appointments</Text>
          </View>
          <View style={styles.statCard}>
            <CreditCard size={20} color="#10B981" strokeWidth={2} />
            <Text style={styles.statNumber}>{formatCurrency(302)}</Text>
            <Text style={styles.statLabel}>Avg. Booking</Text>
          </View>
          <View style={styles.statCard}>
            <PieChart size={20} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.statNumber}>18%</Text>
            <Text style={styles.statLabel}>Commission</Text>
          </View>
        </View>

        {/* Monthly Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Monthly Performance</Text>
            <TouchableOpacity>
              <BarChart3 size={20} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.chart}>
            {monthlyBreakdown.map((item, index) => {
              const maxAmount = Math.max(...monthlyBreakdown.map(m => m.amount));
              const height = (item.amount / maxAmount) * 100;
              
              return (
                <View key={index} style={styles.chartBar}>
                  <View style={[styles.bar, { height: `${height}%` }]} />
                  <Text style={styles.chartLabel}>{item.month}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionClient}>{transaction.client}</Text>
                <Text style={styles.transactionService}>{transaction.service}</Text>
                <Text style={styles.transactionDate}>
                  {transaction.date} at {transaction.time}
                </Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={styles.amountText}>{formatCurrency(transaction.amount)}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{transaction.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Financial Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Financial Summary</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Gross Revenue</Text>
              <Text style={styles.summaryValue}>{formatCurrency(7240)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Platform Fee (3%)</Text>
              <Text style={styles.summaryValue}>-{formatCurrency(217)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Processing Fee</Text>
              <Text style={styles.summaryValue}>-{formatCurrency(145)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabelBold}>Net Earnings</Text>
              <Text style={styles.summaryValueBold}>{formatCurrency(6878)}</Text>
            </View>
          </View>
        </View>

        {/* Payout Information */}
        <View style={styles.payoutSection}>
          <Text style={styles.sectionTitle}>Next Payout</Text>
          <View style={styles.payoutCard}>
            <View style={styles.payoutInfo}>
              <Text style={styles.payoutAmount}>{formatCurrency(1240)}</Text>
              <Text style={styles.payoutDate}>Expected: Dec 22, 2024</Text>
              <Text style={styles.payoutMethod}>Bank Account •••• 4567</Text>
            </View>
            <TouchableOpacity style={styles.payoutButton}>
              <Text style={styles.payoutButtonText}>View Details</Text>
            </TouchableOpacity>
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
  downloadButton: {
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
  mainEarningsCard: {
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
  earningsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  earningsInfo: {
    marginLeft: 16,
    flex: 1,
  },
  earningsLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  earningsAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#111827',
  },
  growthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  growthText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
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
    fontSize: 16,
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
  bar: {
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
  transactionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionClient: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  transactionService: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  transactionDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#10B981',
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#166534',
    textTransform: 'capitalize',
  },
  summarySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  summaryLabelBold: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
  },
  summaryValueBold: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#10B981',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  payoutSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  payoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  payoutInfo: {
    flex: 1,
  },
  payoutAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 4,
  },
  payoutDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  payoutMethod: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  payoutButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  payoutButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});