export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          subscription_plan: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_plan?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_plan?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      resumes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          template_id: string;
          status: string;
          data: Json;
          style: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          template_id?: string;
          status?: string;
          data?: Json;
          style?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          template_id?: string;
          status?: string;
          data?: Json;
          style?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      resume_sections: {
        Row: {
          id: string;
          resume_id: string;
          section_type: string;
          title: string;
          content: Json;
          sort_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          resume_id: string;
          section_type: string;
          title: string;
          content?: Json;
          sort_order?: number;
          is_visible?: boolean;
        };
        Update: {
          title?: string;
          content?: Json;
          sort_order?: number;
          is_visible?: boolean;
        };
        Relationships: [];
      };
      templates: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          preview_url: string | null;
          required_plan: string;
          is_active: boolean;
          created_at?: string;
        };
        Insert: {
          id: string;
          name: string;
          slug: string;
          description?: string | null;
          preview_url?: string | null;
          required_plan?: string;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          preview_url?: string | null;
          required_plan?: string;
          is_active?: boolean;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          id: string;
          user_id: string;
          theme: string;
          accent_color: string;
          font_family: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          theme?: string;
          accent_color?: string;
          font_family?: string;
        };
        Update: {
          theme?: string;
          accent_color?: string;
          font_family?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
