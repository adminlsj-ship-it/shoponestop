import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Booking } from '@/types/database';
import { useNotifications } from '@/components/NotificationService';

export function useBookingSystem(userId?: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const { sendBookingNotification } = useNotifications();

  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          business:businesses(*),
          service:services(*),
          client:users(*)
        `)
        .or(`client_id.eq.${userId},business_id.eq.${userId}`)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: {
    businessId: string;
    serviceId: string;
    appointmentDate: string;
    appointmentTime: string;
    notes?: string;
    totalAmount: number;
  }) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          client_id: userId,
          business_id: bookingData.businessId,
          service_id: bookingData.serviceId,
          appointment_date: bookingData.appointmentDate,
          appointment_time: bookingData.appointmentTime,
          notes: bookingData.notes,
          total_amount: bookingData.totalAmount,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      
      // Send notification
      sendBookingNotification(data);
      
      // Schedule reminders
      scheduleReminders(data);
      
      setBookings(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  };

  const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? data : booking
      ));
      
      return data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  };

  const scheduleReminders = (booking: Booking) => {
    // This would integrate with a background job service
    // to send SMS reminders at appropriate times
    console.log('Scheduling reminders for booking:', booking.id);
    
    // Schedule 24-hour reminder
    // Schedule 1-hour reminder
    // These would be handled by a backend service
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, 'cancelled');
      // Send cancellation notification
    } catch (error) {
      throw error;
    }
  };

  return {
    bookings,
    loading,
    createBooking,
    updateBookingStatus,
    cancelBooking,
    refreshBookings: fetchBookings,
  };
}