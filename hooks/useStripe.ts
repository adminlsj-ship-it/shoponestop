import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { stripeProducts, getProductByPriceId } from '@/src/stripe-config';

interface StripeSubscription {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

interface StripeOrder {
  order_id: number;
  checkout_session_id: string;
  payment_intent_id: string;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  order_status: string;
  order_date: string;
}

export function useStripe() {
  const [subscription, setSubscription] = useState<StripeSubscription | null>(null);
  const [orders, setOrders] = useState<StripeOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptionData();
    fetchOrdersData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Error fetching subscription:', error);
        setError('Failed to fetch subscription data');
        return;
      }

      setSubscription(data);
    } catch (err) {
      console.error('Error in fetchSubscriptionData:', err);
      setError('Failed to fetch subscription data');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersData = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      setOrders(data || []);
    } catch (err) {
      console.error('Error in fetchOrdersData:', err);
    }
  };

  const createCheckoutSession = async (priceId: string, mode: 'payment' | 'subscription' = 'subscription') => {
    try {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: priceId,
          mode,
          success_url: `${window.location.origin}/checkout/success`,
          cancel_url: `${window.location.origin}/business/membership`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (err: any) {
      console.error('Error creating checkout session:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPlan = () => {
    if (!subscription || !subscription.price_id) {
      return { name: 'Basic', price: 'Free' };
    }

    const product = getProductByPriceId(subscription.price_id);
    return product ? { name: product.name, price: `$${product.price}` } : { name: 'Unknown', price: 'N/A' };
  };

  const isSubscriptionActive = () => {
    return subscription?.subscription_status === 'active' || subscription?.subscription_status === 'trialing';
  };

  return {
    subscription,
    orders,
    loading,
    error,
    createCheckoutSession,
    getCurrentPlan,
    isSubscriptionActive,
    refreshData: () => {
      fetchSubscriptionData();
      fetchOrdersData();
    },
  };
}