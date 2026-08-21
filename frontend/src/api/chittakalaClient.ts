// @ts-ignore
const getBaseUrl = (): string => {
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:8000";
  }
  return (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_URL) || "https://chittakala-api-s2w5wrywxq-uc.a.run.app";
};

export interface ArtForm {
  art_form_id: string;
  title: string;
  short_description: string;
  thumbnail_path: string;
  source_note?: string;
  display_order: number;
  active: boolean;
}

export interface Category {
  category_id: string;
  art_form_id: string;
  title: string;
  short_description: string;
  thumbnail_path: string;
  display_order: number;
  active: boolean;
}

export interface Exercise {
  exercise_id: string;
  art_form_id: string;
  category_id: string;
  title: string;
  art_form: string;
  difficulty: string;
  short_description: string;
  reference_image_path: string;
  visible_elements: string[];
  drawing_guidance: string[];
  allowed_next_actions: string[];
  source_attribution?: string;
  review_status: string;
  estimated_minutes: number;
  active: boolean;
}

export interface Session {
  session_id: string;
  anonymous_user_id: string;
  display_name?: string;
  art_form_id: string;
  category_id: string;
  exercise_id: string;
  status: string;
  pre_check_in?: string;
  post_check_in?: string;
  started_at: string;
  completed_at?: string;
  duration_seconds?: number;
  drawing_path?: string;
  feedback_id?: string;
  feedback?: {
    visual_observation: string;
    encouragement: string;
    next_step: string;
    safety_status: string;
    needs_retake: boolean;
    fallback_used: boolean;
  };
}

export class ChittakalaClient {
  static async checkHealth(): Promise<{ status: string; service: string }> {
    const res = await fetch(`${getBaseUrl()}/health`);
    if (!res.ok) throw new Error("Backend API health check failed");
    return res.json();
  }

  static async getArtForms(): Promise<ArtForm[]> {
    const res = await fetch(`${getBaseUrl()}/art-forms`);
    if (!res.ok) throw new Error("Failed to fetch art forms");
    return res.json();
  }

  static async getCategories(artFormId: string): Promise<Category[]> {
    const res = await fetch(`${getBaseUrl()}/art-forms/${artFormId}/categories`);
    if (!res.ok) throw new Error(`Failed to fetch categories for ${artFormId}`);
    return res.json();
  }

  static async getExercises(categoryId: string): Promise<Exercise[]> {
    const res = await fetch(`${getBaseUrl()}/categories/${categoryId}/exercises`);
    if (!res.ok) throw new Error(`Failed to fetch exercises for category ${categoryId}`);
    return res.json();
  }

  static async createSession(payload: {
    art_form_id: string;
    category_id: string;
    exercise_id: string;
    display_name?: string;
    pre_check_in?: string;
  }): Promise<Session> {
    const res = await fetch(`${getBaseUrl()}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to create session");
    }
    return res.json();
  }

  static async uploadDrawing(sessionId: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${getBaseUrl()}/sessions/${sessionId}/drawing`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload drawing");
    return res.json();
  }

  static async requestReflection(sessionId: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${getBaseUrl()}/sessions/${sessionId}/reflect`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to generate reflection");
    return res.json();
  }

  static async updatePostCheckIn(sessionId: string, postCheckIn: string): Promise<Session> {
    const res = await fetch(`${getBaseUrl()}/sessions/${sessionId}/check-in`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_check_in: postCheckIn }),
    });
    if (!res.ok) throw new Error("Failed to update post check-in");
    return res.json();
  }

  static async completeSession(sessionId: string): Promise<Session> {
    const res = await fetch(`${getBaseUrl()}/sessions/${sessionId}/complete`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to complete session");
    return res.json();
  }
}
