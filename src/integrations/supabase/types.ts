export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string
          author_name: string
          category: string
          content: string
          created_at: string | null
          excerpt: string
          id: string
          image_url: string
          publish_date: string | null
          read_time: string
          status: string
          title: string
        }
        Insert: {
          author_id: string
          author_name: string
          category: string
          content: string
          created_at?: string | null
          excerpt: string
          id?: string
          image_url?: string
          publish_date?: string | null
          read_time: string
          status?: string
          title: string
        }
        Update: {
          author_id?: string
          author_name?: string
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string
          id?: string
          image_url?: string
          publish_date?: string | null
          read_time?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      containers: {
        Row: {
          actual_arrival: string | null
          container_number: string
          created_at: string | null
          departure_date: string | null
          estimated_arrival: string | null
          id: string
          notes: string | null
          shipping_line: string
          status: string
          total_volume_capacity: number
          used_volume: number | null
          used_weight: number | null
          vessel_name: string | null
          weight_capacity: number
        }
        Insert: {
          actual_arrival?: string | null
          container_number: string
          created_at?: string | null
          departure_date?: string | null
          estimated_arrival?: string | null
          id?: string
          notes?: string | null
          shipping_line: string
          status?: string
          total_volume_capacity: number
          used_volume?: number | null
          used_weight?: number | null
          vessel_name?: string | null
          weight_capacity: number
        }
        Update: {
          actual_arrival?: string | null
          container_number?: string
          created_at?: string | null
          departure_date?: string | null
          estimated_arrival?: string | null
          id?: string
          notes?: string | null
          shipping_line?: string
          status?: string
          total_volume_capacity?: number
          used_volume?: number | null
          used_weight?: number | null
          vessel_name?: string | null
          weight_capacity?: number
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string | null
          description: string | null
          document_type: string
          file_name: string
          file_url: string
          id: string
          shipment_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          document_type: string
          file_name: string
          file_url: string
          id?: string
          shipment_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          document_type?: string
          file_name?: string
          file_url?: string
          id?: string
          shipment_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_balance: number | null
          company_name: string
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone_number: string
          role: string | null
        }
        Insert: {
          account_balance?: number | null
          company_name: string
          created_at?: string | null
          email: string
          full_name: string
          id: string
          phone_number: string
          role?: string | null
        }
        Update: {
          account_balance?: number | null
          company_name?: string
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone_number?: string
          role?: string | null
        }
        Relationships: []
      }
      shipments: {
        Row: {
          actual_arrival: string | null
          container_id: string | null
          created_at: string | null
          description: string
          estimated_arrival: string | null
          id: string
          notes: string | null
          order_number: string
          proforma_invoice_url: string | null
          status: string
          tracking_number: string | null
          user_id: string
          vendor_id: string
          volume: number
          weight: number
        }
        Insert: {
          actual_arrival?: string | null
          container_id?: string | null
          created_at?: string | null
          description: string
          estimated_arrival?: string | null
          id?: string
          notes?: string | null
          order_number: string
          proforma_invoice_url?: string | null
          status?: string
          tracking_number?: string | null
          user_id: string
          vendor_id: string
          volume: number
          weight: number
        }
        Update: {
          actual_arrival?: string | null
          container_id?: string | null
          created_at?: string | null
          description?: string
          estimated_arrival?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          proforma_invoice_url?: string | null
          status?: string
          tracking_number?: string | null
          user_id?: string
          vendor_id?: string
          volume?: number
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "shipments_container_id_fkey"
            columns: ["container_id"]
            isOneToOne: false
            referencedRelation: "containers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      tracking_updates: {
        Row: {
          created_at: string | null
          id: string
          location: string
          notes: string | null
          shipment_id: string
          status: string
          updated_by: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          location: string
          notes?: string | null
          shipment_id: string
          status: string
          updated_by: string
        }
        Update: {
          created_at?: string | null
          id?: string
          location?: string
          notes?: string | null
          shipment_id?: string
          status?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "tracking_updates_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string | null
          description: string
          id: string
          reference_number: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string | null
          description: string
          id?: string
          reference_number?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string | null
          description?: string
          id?: string
          reference_number?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      vendors: {
        Row: {
          address: string
          city: string
          contact_person: string
          country: string
          created_at: string | null
          email: string
          id: string
          name: string
          notes: string | null
          phone: string
          user_id: string
        }
        Insert: {
          address: string
          city: string
          contact_person: string
          country: string
          created_at?: string | null
          email: string
          id?: string
          name: string
          notes?: string | null
          phone: string
          user_id: string
        }
        Update: {
          address?: string
          city?: string
          contact_person?: string
          country?: string
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string
          user_id?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
