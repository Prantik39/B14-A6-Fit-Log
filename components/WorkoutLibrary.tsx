"use client";

import { useState, useEffect } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { Workout } from "@/types/workout";
import { getWorkouts } from "@/services/workoutApi";
import WorkoutCard from "@/components/WorkoutCard";
import WorkoutSkeleton from "@/components/WorkoutSkeleton";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadWorkouts() {
      setIsLoading(true);
      const data = await getWorkouts();
      setWorkouts(data);
      setIsLoading(false);
    }
    loadWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter((workout) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const matchesName = workout.name.toLowerCase().includes(query);
    const matchesMuscle = workout.muscleGroups.some((group) =>
      group.toLowerCase().includes(query)
    );
    const matchesEquipment = workout.equipment.toLowerCase().includes(query);
    return matchesName || matchesMuscle || matchesEquipment;
  });

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
            THE LIBRARY
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <LuSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lift, muscle..."
            className="w-full rounded-xl border border-[#1e2430] bg-[#12151c] py-2.5 pr-9 pl-9 text-xs text-white placeholder-zinc-500 focus:border-[#ccff00] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <LuX className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <WorkoutSkeleton key={index} />
          ))}
        </div>
      ) : filteredWorkouts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#222834] py-16 text-center">
          <p className="font-display text-lg font-bold tracking-wider text-white uppercase">
            No Workouts Found
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            No exercises match your search query &quot;{searchQuery}&quot;.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-4 rounded-lg bg-[#1a2414] px-4 py-2 text-xs font-semibold text-[#ccff00] hover:bg-[#23321b]"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
