export interface JourneySessionRecord {
  session_id: string;
  art_form_id: string;
  art_form_title: string;
  category_id: string;
  exercise_id: string;
  exercise_title: string;
  completed_at: string;
  duration_seconds: number;
  pre_check_in?: string;
  post_check_in?: string;
}

export interface JourneyStats {
  totalSessions: number;
  exploredArtForms: string[];
  totalMinutes: number;
  gentleReflection: string;
  recommendation: {
    art_form_id: string;
    title: string;
    description: string;
    category_id: string;
  };
}

const STORAGE_KEY = "chittakala_journey_history";
const OFFLINE_QUEUE_KEY = "chittakala_offline_queue";

export class JourneyService {
  /**
   * Saves an offline completed session to the pending sync queue.
   */
  static saveOfflineSession(record: JourneySessionRecord): void {
    try {
      const queue = this.getOfflineQueue();
      queue.push(record);
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
      // Also save to local Journey history immediately so user sees their progress offline!
      this.saveCompletedSession(record);
    } catch (e) {
      console.warn("Failed to queue offline session:", e);
    }
  }

  /**
   * Retrieves pending offline session queue.
   */
  static getOfflineQueue(): JourneySessionRecord[] {
    try {
      const data = localStorage.getItem(OFFLINE_QUEUE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Clears pending offline session queue.
   */
  static clearOfflineQueue(): void {
    try {
      localStorage.removeItem(OFFLINE_QUEUE_KEY);
    } catch (e) {
      console.warn("Failed to clear offline queue:", e);
    }
  }

  /**
   * Flushes and synchronizes pending offline sessions with backend telemetry.
   */
  static async syncOfflineQueue(chittakalaClient: any): Promise<number> {
    const queue = this.getOfflineQueue();
    if (queue.length === 0) return 0;

    let syncedCount = 0;
    const remainingQueue: JourneySessionRecord[] = [];

    for (const record of queue) {
      try {
        if (chittakalaClient && typeof chittakalaClient.completeSession === "function") {
          await chittakalaClient.completeSession(record.session_id, {
            post_check_in: record.post_check_in,
            duration_seconds: record.duration_seconds,
          });
        }
        syncedCount++;
      } catch (e) {
        console.warn(`Failed to sync queued offline session ${record.session_id}:`, e);
        remainingQueue.push(record);
      }
    }

    if (remainingQueue.length > 0) {
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(remainingQueue));
    } else {
      this.clearOfflineQueue();
    }

    return syncedCount;
  }

  /**
   * Retrieves stored session metadata history (capped at 50 most recent sessions).
   */
  static getJourneyHistory(): JourneySessionRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn("Failed to load journey history from localStorage:", e);
      return [];
    }
  }

  /**
   * Saves completed session metadata (NO uploaded photos saved).
   */
  static saveCompletedSession(record: JourneySessionRecord): void {
    try {
      const history = this.getJourneyHistory();
      // Avoid duplicate entries for same session_id
      const exists = history.some((item) => item.session_id === record.session_id);
      if (exists) {
        // Update existing record
        const updated = history.map((item) =>
          item.session_id === record.session_id ? { ...item, ...record } : item
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return;
      }
      // Prepend newest session and cap at 50 records
      const newHistory = [record, ...history].slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.warn("Failed to save session to journey history:", e);
    }
  }

  /**
   * Privacy-first history reset.
   */
  static clearJourneyHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear journey history:", e);
    }
  }

  /**
   * Computes gentle statistics and recommendations.
   */
  static computeJourneyStats(): JourneyStats {
    const history = this.getJourneyHistory();
    const totalSessions = history.length;

    // Distinct art forms explored
    const artFormSet = new Set<string>();
    history.forEach((h) => {
      if (h.art_form_title) {
        artFormSet.add(h.art_form_title);
      } else if (h.art_form_id) {
        const formatted = h.art_form_id.charAt(0).toUpperCase() + h.art_form_id.slice(1);
        artFormSet.add(formatted);
      }
    });

    const exploredArtForms = Array.from(artFormSet);

    // Cumulative creative minutes
    const totalSeconds = history.reduce((acc, curr) => acc + (curr.duration_seconds || 300), 0);
    const totalMinutes = Math.max(totalSessions * 5, Math.round(totalSeconds / 60));

    // Gentle narrative reflection
    let gentleReflection = "Welcome to your creative journey. Start your first 5-minute art routine today.";
    if (totalSessions > 0) {
      if (exploredArtForms.length === 1) {
        gentleReflection = `You dedicated ${totalMinutes} peaceful minutes to your ${exploredArtForms[0]} practice.`;
      } else {
        gentleReflection = `You explored ${exploredArtForms.length} creative traditions across ${totalMinutes} mindful drawing minutes.`;
      }
    }

    // Gentle "Try Something Different" recommendation logic
    const allTraditions = [
      {
        art_form_id: "kolam",
        title: "Kolam Flowing Loop Motifs",
        description: "Explore South Indian threshold geometry with dot grids and continuous loops.",
        category_id: "simple-dot-kolams",
      },
      {
        art_form_id: "madhubani",
        title: "Madhubani Dual-Line Borders",
        description: "Practice Bihar's Mithila art with double-line lotus creepers and peacock borders.",
        category_id: "madhubani-borders",
      },
      {
        art_form_id: "gond",
        title: "Gond Nature & Dot Textures",
        description: "Discover Central Indian indigenous tribal patterns filled with fine dashes and dots.",
        category_id: "gond-patterns",
      },
      {
        art_form_id: "warli",
        title: "Warli Tribal Geometry",
        description: "Connect with Maharashtra's traditional triangle and circle village dance figures.",
        category_id: "basic-figures",
      },
    ];

    const exploredIds = new Set(history.map((h) => h.art_form_id.toLowerCase()));
    let recommendation = allTraditions.find((t) => !exploredIds.has(t.art_form_id));

    if (!recommendation) {
      // If user has tried all traditions, pick the least recently practiced one
      recommendation = allTraditions[0];
    }

    return {
      totalSessions,
      exploredArtForms,
      totalMinutes,
      gentleReflection,
      recommendation,
    };
  }
}
