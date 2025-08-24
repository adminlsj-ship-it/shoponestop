import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Business, Service } from '@/types/database';

export function useBusinessData(businessId?: string) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (businessId) {
      fetchBusinessData();
    }
  }, [businessId]);

  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      
      // Fetch business details
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .single();

      if (businessError) throw businessError;
      setBusiness(businessData);

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('business_id', businessId)
        .eq('is_active', true);

      if (servicesError) throw servicesError;
      setServices(servicesData || []);

    } catch (error) {
      console.error('Error fetching business data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addService = async (serviceData: Omit<Service, 'id' | 'business_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert({
          ...serviceData,
          business_id: businessId,
        })
        .select()
        .single();

      if (error) throw error;
      setServices(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    }
  };

  const updateService = async (serviceId: string, updates: Partial<Service>) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', serviceId)
        .select()
        .single();

      if (error) throw error;
      setServices(prev => prev.map(service => 
        service.id === serviceId ? data : service
      ));
      return data;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  };

  const deleteService = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;
      setServices(prev => prev.filter(service => service.id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  };

  return {
    business,
    services,
    loading,
    addService,
    updateService,
    deleteService,
    refreshData: fetchBusinessData,
  };
}