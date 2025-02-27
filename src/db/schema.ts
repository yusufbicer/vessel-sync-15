
/**
 * Groop - Supabase Database Schema
 * 
 * This file contains the TypeScript definitions for the Supabase database tables
 * used in the Groop consolidation service platform.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string
          company_name: string
          phone_number: string
          account_balance: number
          role: 'customer' | 'admin' | 'support'
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name: string
          company_name: string
          phone_number: string
          account_balance?: number
          role?: 'customer' | 'admin' | 'support'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string
          company_name?: string
          phone_number?: string
          account_balance?: number
          role?: 'customer' | 'admin' | 'support'
        }
      }
      
      vendors: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          contact_person: string
          email: string
          phone: string
          address: string
          city: string
          country: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          contact_person: string
          email: string
          phone: string
          address: string
          city: string
          country: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          contact_person?: string
          email?: string
          phone?: string
          address?: string
          city?: string
          country?: string
          notes?: string | null
        }
      }
      
      containers: {
        Row: {
          id: string
          created_at: string
          container_number: string
          status: 'pending' | 'loading' | 'in_transit' | 'customs' | 'delivered'
          departure_date: string | null
          estimated_arrival: string | null
          actual_arrival: string | null
          total_volume_capacity: number
          used_volume: number
          weight_capacity: number
          used_weight: number
          shipping_line: string
          vessel_name: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          container_number: string
          status?: 'pending' | 'loading' | 'in_transit' | 'customs' | 'delivered'
          departure_date?: string | null
          estimated_arrival?: string | null
          actual_arrival?: string | null
          total_volume_capacity: number
          used_volume?: number
          weight_capacity: number
          used_weight?: number
          shipping_line: string
          vessel_name?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          container_number?: string
          status?: 'pending' | 'loading' | 'in_transit' | 'customs' | 'delivered'
          departure_date?: string | null
          estimated_arrival?: string | null
          actual_arrival?: string | null
          total_volume_capacity?: number
          used_volume?: number
          weight_capacity?: number
          used_weight?: number
          shipping_line?: string
          vessel_name?: string | null
          notes?: string | null
        }
      }
      
      shipments: {
        Row: {
          id: string
          created_at: string
          user_id: string
          vendor_id: string
          container_id: string | null
          order_number: string
          description: string
          volume: number
          weight: number
          status: 'ordered' | 'received_at_warehouse' | 'packed' | 'shipped' | 'in_transit' | 'customs' | 'delivered'
          proforma_invoice_url: string | null
          estimated_arrival: string | null
          actual_arrival: string | null
          tracking_number: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          vendor_id: string
          container_id?: string | null
          order_number: string
          description: string
          volume: number
          weight: number
          status?: 'ordered' | 'received_at_warehouse' | 'packed' | 'shipped' | 'in_transit' | 'customs' | 'delivered'
          proforma_invoice_url?: string | null
          estimated_arrival?: string | null
          actual_arrival?: string | null
          tracking_number?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          vendor_id?: string
          container_id?: string | null
          order_number?: string
          description?: string
          volume?: number
          weight?: number
          status?: 'ordered' | 'received_at_warehouse' | 'packed' | 'shipped' | 'in_transit' | 'customs' | 'delivered'
          proforma_invoice_url?: string | null
          estimated_arrival?: string | null
          actual_arrival?: string | null
          tracking_number?: string | null
          notes?: string | null
        }
      }
      
      documents: {
        Row: {
          id: string
          created_at: string
          user_id: string
          shipment_id: string | null
          document_type: 'proforma_invoice' | 'packing_list' | 'bill_of_lading' | 'certificate_of_origin' | 'customs_declaration' | 'other'
          file_url: string
          file_name: string
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          shipment_id?: string | null
          document_type: 'proforma_invoice' | 'packing_list' | 'bill_of_lading' | 'certificate_of_origin' | 'customs_declaration' | 'other'
          file_url: string
          file_name: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          shipment_id?: string | null
          document_type?: 'proforma_invoice' | 'packing_list' | 'bill_of_lading' | 'certificate_of_origin' | 'customs_declaration' | 'other'
          file_url?: string
          file_name?: string
          description?: string | null
        }
      }
      
      tracking_updates: {
        Row: {
          id: string
          created_at: string
          shipment_id: string
          status: string
          location: string
          notes: string | null
          updated_by: string
        }
        Insert: {
          id?: string
          created_at?: string
          shipment_id: string
          status: string
          location: string
          notes?: string | null
          updated_by: string
        }
        Update: {
          id?: string
          created_at?: string
          shipment_id?: string
          status?: string
          location?: string
          notes?: string | null
          updated_by?: string
        }
      }
      
      transactions: {
        Row: {
          id: string
          created_at: string
          user_id: string
          amount: number
          transaction_type: 'deposit' | 'payment' | 'refund' | 'adjustment'
          description: string
          reference_number: string | null
          balance_after: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          amount: number
          transaction_type: 'deposit' | 'payment' | 'refund' | 'adjustment'
          description: string
          reference_number?: string | null
          balance_after: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          amount?: number
          transaction_type?: 'deposit' | 'payment' | 'refund' | 'adjustment'
          description?: string
          reference_number?: string | null
          balance_after?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

/**
 * Database Relationships:
 * 
 * 1. users
 *    - One user can have many vendors (1:N)
 *    - One user can have many shipments (1:N)
 *    - One user can have many documents (1:N)
 *    - One user can have many transactions (1:N)
 * 
 * 2. vendors
 *    - One vendor belongs to one user (N:1)
 *    - One vendor can have many shipments (1:N)
 * 
 * 3. containers
 *    - One container can have many shipments (1:N)
 * 
 * 4. shipments
 *    - One shipment belongs to one user (N:1)
 *    - One shipment belongs to one vendor (N:1)
 *    - One shipment belongs to one container (N:1)
 *    - One shipment can have many documents (1:N)
 *    - One shipment can have many tracking updates (1:N)
 * 
 * 5. documents
 *    - One document belongs to one user (N:1)
 *    - One document can be associated with one shipment (N:1)
 * 
 * 6. tracking_updates
 *    - One tracking update belongs to one shipment (N:1)
 * 
 * 7. transactions
 *    - One transaction belongs to one user (N:1)
 */

// Define RLS policies for each table with role-based access
/**
 * RLS Policies:
 * 
 * users:
 * - Users can read/update their own profile
 * - Admins can read all profiles and update any profile
 * 
 * vendors:
 * - Users can CRUD their own vendors
 * - Admins can read all vendors and update any vendor
 * 
 * containers:
 * - Users can read containers associated with their shipments
 * - Admins can CRUD all containers
 * 
 * shipments:
 * - Users can CRUD their own shipments
 * - Admins can CRUD all shipments
 * 
 * documents:
 * - Users can CRUD their own documents
 * - Admins can read all documents
 * 
 * tracking_updates:
 * - Users can read tracking updates for their shipments
 * - Admins can CRUD all tracking updates
 * 
 * transactions:
 * - Users can read their own transactions
 * - Admins can CRUD all transactions
 */
