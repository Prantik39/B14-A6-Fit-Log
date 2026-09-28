"use client";

import { useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import { getWorkouts } from "@/services/workoutApi";
import WorkoutCard from "@/components/WorkoutCard";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      setIsLoading(true);
      const data = await getWorkouts();
      setWorkouts(data);
      setIsLoading(false);
    }
    loadWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
          THE LIBRARY
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-center">
          <p className="font-display text-sm tracking-wide text-zinc-400 uppercase">
            Loading workouts…
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
