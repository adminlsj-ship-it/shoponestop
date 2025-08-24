import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react-native';

const cartItems = [
  {
    id: '1',
    name: 'Luxury Hydrating Serum',
    brand: 'GlowSkin',
    price: 89,
    quantity: 1,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Professional Makeup Palette',
    brand: 'ColorPro',
    price: 65,
    quantity: 2,
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function CartScreen() {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter(item => item.id !== id));
    } else {
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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
        <Text style={styles.title}>Shopping Cart</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <View style={styles.cartSection}>
          <Text style={styles.sectionTitle}>Your Items ({items.length})</Text>
          
          {items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              
              <View style={styles.itemInfo}>
                <Text style={styles.itemBrand}>{item.brand}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
              
              <View style={styles.itemActions}>
                <View style={styles.quantityControls}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} color="#6B7280" strokeWidth={2} />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} color="#6B7280" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => updateQuantity(item.id, 0)}
                >
                  <Trash2 size={16} color="#EF4444" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Shipping Notice */}
        <View style={styles.shippingNotice}>
          <ShoppingBag size={20} color="#10B981" strokeWidth={2} />
          <Text style={styles.shippingText}>
            {subtotal > 100 
              ? 'Congratulations! You qualify for free shipping.' 
              : `Add $${(100 - subtotal).toFixed(2)} more for free shipping.`
            }
          </Text>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={[styles.summaryValue, shipping === 0 && styles.freeShipping]}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Recommended Products */}
        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>You Might Also Like</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.recommendedItem}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.recommendedImage}
              />
              <Text style={styles.recommendedName}>Hair Treatment</Text>
              <Text style={styles.recommendedPrice}>$45</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.recommendedItem}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/4465030/pexels-photo-4465030.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.recommendedImage}
              />
              <Text style={styles.recommendedName}>Face Cream</Text>
              <Text style={styles.recommendedPrice}>$32</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => router.push('/checkout/shipping')}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
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
  placeholder: {
    width: 40,
  },
  cartSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  cartItem: {
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
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemBrand: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
    marginBottom: 4,
  },
  itemName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#F43F5E',
  },
  itemActions: {
    alignItems: 'center',
    gap: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    paddingHorizontal: 16,
  },
  deleteButton: {
    padding: 8,
  },
  shippingNotice: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  shippingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  summaryCard: {
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
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  summaryValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  freeShipping: {
    color: '#10B981',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  totalLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#F43F5E',
  },
  recommendedSection: {
    paddingLeft: 20,
    marginBottom: 120,
  },
  recommendedItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  recommendedImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
  },
  recommendedName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  recommendedPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#F43F5E',
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
  totalInfo: {
    flex: 1,
  },
  totalLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  totalAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
  },
  checkoutButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  checkoutButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});