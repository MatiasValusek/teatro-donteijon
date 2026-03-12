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
      group_info: {
        Row: {
          contact_email: string;
          created_at: string;
          hero_image_alt: string;
          hero_image_url: string;
          highlighted_quote: string;
          history: string[];
          history_image_alt: string;
          history_image_url: string;
          id: string;
          instagram_url: string;
          manifesto: string[];
          manifesto_pillars: string[];
          name: string;
          phone: string | null;
          press_email: string | null;
          short_name: string;
          city: string;
          focus_areas: string[];
          subtitle: string;
          updated_at: string;
        };
        Insert: {
          contact_email: string;
          created_at?: string;
          hero_image_alt: string;
          hero_image_url: string;
          highlighted_quote: string;
          history?: string[];
          history_image_alt: string;
          history_image_url: string;
          id?: string;
          instagram_url: string;
          manifesto?: string[];
          manifesto_pillars?: string[];
          name: string;
          phone?: string | null;
          press_email?: string | null;
          short_name: string;
          city: string;
          focus_areas?: string[];
          subtitle: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["group_info"]["Insert"]>;
        Relationships: [];
      };
      group_milestones: {
        Row: {
          created_at: string;
          description: string;
          group_info_id: string;
          id: string;
          label: string;
          sort_order: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          group_info_id: string;
          id?: string;
          label: string;
          sort_order?: number;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["group_milestones"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "group_milestones_group_info_id_fkey";
            columns: ["group_info_id"];
            isOneToOne: false;
            referencedRelation: "group_info";
            referencedColumns: ["id"];
          },
        ];
      };
      group_gallery: {
        Row: {
          alt_text: string;
          caption: string;
          category: string;
          created_at: string;
          group_info_id: string;
          id: string;
          image_url: string;
          sort_order: number;
        };
        Insert: {
          alt_text: string;
          caption: string;
          category: string;
          created_at?: string;
          group_info_id: string;
          id?: string;
          image_url: string;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["group_gallery"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "group_gallery_group_info_id_fkey";
            columns: ["group_info_id"];
            isOneToOne: false;
            referencedRelation: "group_info";
            referencedColumns: ["id"];
          },
        ];
      };
      members: {
        Row: {
          bio: string;
          created_at: string;
          id: string;
          image_url: string;
          is_active: boolean;
          name: string;
          role: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          bio: string;
          created_at?: string;
          id?: string;
          image_url: string;
          is_active?: boolean;
          name: string;
          role: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["members"]["Insert"]>;
        Relationships: [];
      };
      works: {
        Row: {
          artistic_text: string | null;
          cast: string[];
          cover_image_alt: string;
          cover_image_url: string;
          created_at: string;
          director: string;
          duration_minutes: number;
          featured: boolean;
          full_description: string;
          genre: string;
          id: string;
          is_published: boolean;
          short_description: string;
          slug: string;
          sort_order: number;
          status: Database["public"]["Enums"]["work_status"];
          technical_sheet: string[];
          title: string;
          updated_at: string;
        };
        Insert: {
          artistic_text?: string | null;
          cast?: string[];
          cover_image_alt: string;
          cover_image_url: string;
          created_at?: string;
          director: string;
          duration_minutes: number;
          featured?: boolean;
          full_description: string;
          genre: string;
          id?: string;
          is_published?: boolean;
          short_description: string;
          slug: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["work_status"];
          technical_sheet?: string[];
          title: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["works"]["Insert"]>;
        Relationships: [];
      };
      work_gallery: {
        Row: {
          alt_text: string;
          created_at: string;
          id: string;
          image_url: string;
          sort_order: number;
          work_id: string;
        };
        Insert: {
          alt_text: string;
          created_at?: string;
          id?: string;
          image_url: string;
          sort_order?: number;
          work_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["work_gallery"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "work_gallery_work_id_fkey";
            columns: ["work_id"];
            isOneToOne: false;
            referencedRelation: "works";
            referencedColumns: ["id"];
          },
        ];
      };
      functions: {
        Row: {
          created_at: string;
          id: string;
          is_active: boolean;
          reservation_url: string;
          starts_at: string;
          ticket_price_text: string | null;
          updated_at: string;
          venue_address: string;
          venue_name: string;
          work_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          reservation_url: string;
          starts_at: string;
          ticket_price_text?: string | null;
          updated_at?: string;
          venue_address: string;
          venue_name: string;
          work_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["functions"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "functions_work_id_fkey";
            columns: ["work_id"];
            isOneToOne: false;
            referencedRelation: "works";
            referencedColumns: ["id"];
          },
        ];
      };
      news_posts: {
        Row: {
          category: Database["public"]["Enums"]["news_category"];
          content: string;
          cover_image_alt: string;
          cover_image_url: string;
          created_at: string;
          excerpt: string;
          featured: boolean;
          id: string;
          is_published: boolean;
          published_at: string | null;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: Database["public"]["Enums"]["news_category"];
          content: string;
          cover_image_alt: string;
          cover_image_url: string;
          created_at?: string;
          excerpt: string;
          featured?: boolean;
          id?: string;
          is_published?: boolean;
          published_at?: string | null;
          slug: string;
          title: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["news_posts"]["Insert"]>;
        Relationships: [];
      };
      news_gallery: {
        Row: {
          alt_text: string;
          created_at: string;
          id: string;
          image_url: string;
          news_post_id: string;
          sort_order: number;
        };
        Insert: {
          alt_text: string;
          created_at?: string;
          id?: string;
          image_url: string;
          news_post_id: string;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["news_gallery"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "news_gallery_news_post_id_fkey";
            columns: ["news_post_id"];
            isOneToOne: false;
            referencedRelation: "news_posts";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      news_category: "anuncio" | "estreno" | "festival" | "prensa" | "taller";
      work_status: "active" | "archive";
    };
    CompositeTypes: Record<string, never>;
  };
};

type PublicSchema = Database["public"];

export type TableName = keyof PublicSchema["Tables"];
export type TableRow<T extends TableName> = PublicSchema["Tables"][T]["Row"];
export type TableInsert<T extends TableName> =
  PublicSchema["Tables"][T]["Insert"];
export type TableUpdate<T extends TableName> =
  PublicSchema["Tables"][T]["Update"];
export type DatabaseEnum<T extends keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][T];
