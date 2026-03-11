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
          summary: string;
          description: string;
          stage: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          summary: string;
          description: string;
          stage: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["works"]["Insert"]>;
        Relationships: [];
      };
      performances: {
        Row: {
          id: string;
          work_id: string;
          venue: string;
          city: string;
          starts_at: string;
          availability: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          work_id: string;
          venue: string;
          city: string;
          starts_at: string;
          availability: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["performances"]["Insert"]>;
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
