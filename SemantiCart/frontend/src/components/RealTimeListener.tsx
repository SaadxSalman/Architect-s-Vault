"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase"; // Adjust path to your supabase client

export default function RealTimeListener() {
  useEffect(() => {
    const supabase = createClient();
    
    // Listen for any change in the products table (stock updates)
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'products' },
        (payload) => {
          console.log('Stock changed!', payload.new);
          // Potential: trigger a toast notification here
        }
      )
      .subscribe();

    return () => { 
      supabase.removeChannel(channel); 
    };
  }, []);

  return null; // This component doesn't render anything UI-wise
}