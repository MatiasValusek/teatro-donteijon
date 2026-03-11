export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      works: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string;
          full_description: string;
          cover_image: string;
          genre: string;
          duration_minutes: number;
          status: "active" | "archive";
          director: string;
          cast: string[];
          featured: boolean;
          artistic_text: string | null;
          technical_sheet: string[];
          gallery: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          short_description: string;
          full_description: string;
          cover_image: string;
          genre: string;
          duration_minutes: number;
          status: "active" | "archive";
          director: string;
          cast: string[];
          featured?: boolean;
          artistic_text?: string | null;
          technical_sheet?: string[];
          gallery?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["works"]["Insert"]>;
        Relationships: [];
      };
      function_events: {
        Row: {
          id: string;
          work_id: string;
          date: string;
          time: string;
          venue_name: string;
          venue_address: string;
          reservation_url: string;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          work_id: string;
          date: string;
          time: string;
          venue_name: string;
          venue_address: string;
          reservation_url: string;
          active?: boolean;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["function_events"]["Insert"]
        >;
        Relationships: [];
      };
      news: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          published_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          published_at: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["news"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
