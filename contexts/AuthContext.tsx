import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/types/database';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: 'client' | 'business';
    phone?: string;
    businessData?: {
      businessName: string;
      businessType: string;
      location: string;
    };
  }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMountedRef.current) {
        setSession(session);
      }
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (isMountedRef.current) {
          setSession(session);
        }
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          if (isMountedRef.current) {
            setUser(null);
            setLoading(false);
          }
        }
      }
    );

    return () => {
      isMountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      if (isMountedRef.current) {
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: 'client' | 'business';
    phone?: string;
    businessData?: {
      businessName: string;
      businessType: string;
      location: string;
    };
  }) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('User creation failed');

    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        user_type: userData.userType,
        phone: userData.phone,
      });

    if (profileError) throw profileError;

    // Create business profile if business user
    if (userData.userType === 'business' && userData.businessData) {
      const { error: businessError } = await supabase
        .from('businesses')
        .insert({
          user_id: authData.user.id,
          business_name: userData.businessData.businessName,
          business_type: userData.businessData.businessType,
          location: userData.businessData.location,
          phone: userData.phone || '',
        });

      if (businessError) throw businessError;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};