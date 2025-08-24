export interface User {
  id: string;
  email: string;
  user_type: 'client' | 'business';
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Business {
  id: string;
  user_id: string;
  business_name: string;
  business_type: string;
  description?: string;
  location: string;
  phone: string;
  website?: string;
  instagram?: string;
  rating: number;
  total_reviews: number;
  is_premium: boolean;
  premium_expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  business_id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  business_id?: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  image_url: string;
  in_stock: boolean;
  stock_quantity: number;
  rating: number;
  total_reviews: number;
  is_bestseller: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  client_id: string;
  business_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

export interface Class {
  id: string;
  business_id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  price: number;
  duration: number; // in minutes
  max_participants: number;
  current_participants: number;
  class_date: string;
  class_time: string;
  location: string;
  skill_level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  materials_included: boolean;
  materials_list?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClassRegistration {
  id: string;
  user_id: string;
  class_id: string;
  registration_date: string;
  status: 'registered' | 'attended' | 'cancelled' | 'no_show';
  payment_status: 'pending' | 'paid' | 'refunded';
  notes?: string;
  created_at: string;
  updated_at: string;
}