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
    sanitized?: boolean;
    responsible_ai_disclaimer?: string;
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

  static async requestReflection(
    sessionId: string,
    file: File,
    exerciseData?: { art_form_id: string; category_id: string; exercise_id: string }
  ): Promise<any> {
    let targetSessionId = sessionId;

    // 1. If local / demo / unconfirmed session, create real session on backend first
    const isServerSession = targetSessionId && targetSessionId.length === 17 && !targetSessionId.includes("demo") && !targetSessionId.includes("local");
    if (!isServerSession && exerciseData) {
      try {
        const newSess = await this.createSession(exerciseData);
        if (newSess && newSess.session_id) {
          targetSessionId = newSess.session_id;
        }
      } catch (e) {
        console.warn("Failed to create backend session before reflect:", e);
      }
    }

    const formData = new FormData();
    formData.append("file", file);

    const primaryUrl = `${getBaseUrl()}/sessions/${targetSessionId}/reflect`;
    let res: Response;
    try {
      res = await fetch(primaryUrl, {
        method: "POST",
        body: formData,
      });
    } catch (netErr) {
      // Fallback: If local fetch fails, attempt direct Cloud Run endpoint
      const cloudRunUrl = `https://chittakala-api-s2w5wrywxq-uc.a.run.app/sessions/${targetSessionId}/reflect`;
      console.warn("Primary API URL fetch failed, retrying via Cloud Run...", netErr);
      const retryFormData = new FormData();
      retryFormData.append("file", file);
      res = await fetch(cloudRunUrl, {
        method: "POST",
        body: retryFormData,
      });
    }

    // 2. If 404 (session not found on backend), create a real session and retry /reflect
    if (res.status === 404 && exerciseData) {
      try {
        const fallbackSess = await this.createSession(exerciseData);
        if (fallbackSess && fallbackSess.session_id) {
          const retryFormData = new FormData();
          retryFormData.append("file", file);
          res = await fetch(`${getBaseUrl()}/sessions/${fallbackSess.session_id}/reflect`, {
            method: "POST",
            body: retryFormData,
          });
        }
      } catch (e) {}
    }

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

  static async completeSession(sessionId: string, retries = 3): Promise<Session> {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const res = await fetch(`${getBaseUrl()}/sessions/${sessionId}/complete`, {
          method: "POST",
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        if (attempt === retries - 1) throw err;
      }
      await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
    }
    throw new Error("Failed to complete session after retries");
  }

  static async deleteSession(sessionId: string): Promise<boolean> {
    try {
      const res = await fetch(`${getBaseUrl()}/sessions/${sessionId}`, {
        method: "DELETE",
      });
      if (res.status === 204 || res.status === 404 || res.ok) {
        return true;
      }
    } catch (e) {
      console.warn("Delete session network warning handled (session cleaned locally):", e);
    }
    return true;
  }

  static async submitReflectionRating(sessionId: string, rating: string, reasonTag?: string): Promise<boolean> {
    try {
      const res = await fetch(`${getBaseUrl()}/sessions/${sessionId}/feedback-rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, reason_tag: reasonTag }),
      });
      return res.ok;
    } catch (e) {
      console.warn("Submit reflection rating failed gracefully:", e);
      return false;
    }
  }
}
