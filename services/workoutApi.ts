import { Workout } from "@/types/workout";

const PRIMARY_API = "https://api.abcz.workers.dev/api/fitlog";
const BACKUP_API = "https://api.api-store.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(PRIMARY_API, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Primary API failed");
    }
    const data = await res.json();
    return data;
  } catch {
    try {
      const res = await fetch(BACKUP_API, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Backup API failed");
      }
      const data = await res.json();
      return data;
    } catch {
      return [];
    }
  }
}

export async function getWorkoutById(id: string | number): Promise<Workout | null> {
  try {
    const res = await fetch(`${PRIMARY_API}/${id}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Primary API failed");
    }
    const data = await res.json();
    return data;
  } catch {
    try {
      const res = await fetch(`${BACKUP_API}/${id}`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Backup API failed");
      }
      const data = await res.json();
      return data;
    } catch {
      return null;
    }
  }
}
