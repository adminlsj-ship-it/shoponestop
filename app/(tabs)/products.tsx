import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, ShoppingCart, Star, Plus } from 'lucide-react-native';

const categories = ['SHOP ALL', 'BEAUTY PRODUCTS', 'CLOTHES', 'HEALTH AND FITNESS', 'TOYS', 'LUXURY', 'ELECTRONICS', 'SEASONAL', 'DEALS', 'FURNITURE'];

const products = [
  {
    id: '1',
    name: 'Luxury Hydrating Serum',
    brand: 'GlowSkin',
    price: '$89',
    originalPrice: '$120',
    rating: 4.8,
    reviews: 234,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'BEAUTY PRODUCTS',
    bestseller: true,
  },
  {
    id: '2',
    name: 'Professional Makeup Palette',
    brand: 'ColorPro',
    price: '$65',
    originalPrice: null,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'BEAUTY PRODUCTS',
    bestseller: false,
  },
  {
    id: '3',
    name: 'Argan Oil Hair Treatment',
    brand: 'PureHair',
    price: '$45',
    originalPrice: '$60',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'BEAUTY PRODUCTS',
    bestseller: true,
  },
];

export default function ProductsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('SHOP ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'SHOP ALL' || product.category === selectedCategory) &&
    (searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToCart = (productId: string) => {
    setCartCount(prev => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Beauty Products</Text>
          <TouchableOpacity style={styles.cartButton}>
            <ShoppingCart size={24} color="#F43F5E" strokeWidth={2} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#F43F5E" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
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
        </View>

        {/* Products Grid */}
        <View style={styles.productsContainer}>
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  {product.bestseller && (
                    <View style={styles.bestsellerBadge}>
                      <Text style={styles.bestsellerText}>Bestseller</Text>
                    </View>
                  )}
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Text style={styles.favoriteIcon}>♡</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.productInfo}>
                  <Text style={styles.brandName}>{product.brand}</Text>
                  <Text style={styles.productName}>{product.name}</Text>
                  
                  <View style={styles.ratingRow}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
                    <Text style={styles.rating}>{product.rating}</Text>
                    <Text style={styles.reviews}>({product.reviews})</Text>
                  </View>
                  
                  <View style={styles.priceRow}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>{product.price}</Text>
                      {product.originalPrice && (
                        <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                      )}
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.addToCartButton}
                      onPress={() => addToCart(product.id)}
                    >
                      <Plus size={16} color="#FFFFFF" strokeWidth={2} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#111827',
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#F43F5E',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    color: '#374151',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  productsContainer: {
    paddingHorizontal: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '48%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  bestsellerBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bestsellerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 16,
    color: '#F43F5E',
  },
  productInfo: {
    padding: 16,
  },
  brandName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
    marginBottom: 4,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    marginBottom: 8,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#111827',
    marginLeft: 4,
  },
  reviews: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
  },
  originalPrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});