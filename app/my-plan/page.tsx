"use client";

import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { useWorkoutContext } from "@/context/WorkoutContext";
import EmptyPlanState from "@/components/EmptyPlanState";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";

export default function MyPlanPage() {
  const { todayPlan, savedList } = useWorkoutContext();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<"Duration" | "Calories" | "Rating">(
    "Duration"
  );
  const [isSortOpen, setIsSortOpen] = useState(false);

  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce(
    (sum, item) => sum + (item.duration || 0),
    0
  );
  const totalCalories = todayPlan.reduce(
    (sum, item) => sum + (item.caloriesBurned || 0),
    0
  );

  const activeList = activeTab === "today" ? todayPlan : savedList;

  const sortedList = [...activeList].sort((a, b) => {
    if (sortBy === "Duration") {
      return (b.duration || 0) - (a.duration || 0);
    }
    if (sortBy === "Calories") {
      return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    }
    if (sortBy === "Rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl">
          MY PLAN
        </h1>
        <p className="mt-2 text-xs text-zinc-400 sm:text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-[#1b2029] bg-[#101319] p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-6 divide-y divide-[#1b2029] sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          <div>
            <span className="text-xs text-zinc-400">Exercises</span>
            <span className="font-display mt-2 block text-4xl font-extrabold text-[#ccff00] sm:text-5xl">
              {totalExercises}
            </span>
          </div>

          <div className="pt-4 sm:pt-0 sm:pl-8">
            <span className="text-xs text-zinc-400">Minutes</span>
            <span className="font-display mt-2 block text-4xl font-extrabold text-white sm:text-5xl">
              {totalMinutes}
            </span>
          </div>

          <div className="pt-4 sm:pt-0 sm:pl-8">
            <span className="text-xs text-zinc-400">Calories</span>
            <span className="font-display mt-2 block text-4xl font-extrabold text-white sm:text-5xl">
              {totalCalories}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-xl border border-[#1e2430] bg-[#101319] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={
              activeTab === "today"
                ? "rounded-lg border border-[#2e3747] bg-[#181d26] px-4 py-1.5 text-xs font-semibold text-white"
                : "px-4 py-1.5 text-xs font-medium text-zinc-400 hover:text-white"
            }
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={
              activeTab === "saved"
                ? "rounded-lg border border-[#2e3747] bg-[#181d26] px-4 py-1.5 text-xs font-semibold text-white"
                : "px-4 py-1.5 text-xs font-medium text-zinc-400 hover:text-white"
            }
          >
            Saved
          </button>
        </div>

        <div className="relative flex items-center gap-2 text-xs text-zinc-400">
          <span>Sort By</span>
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#1e2430] bg-[#101319] px-3.5 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-[#2e3747]"
          >
            <span>{sortBy}</span>
            <LuChevronDown
              className={`h-3.5 w-3.5 text-zinc-400 transition ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-32 overflow-hidden rounded-xl border border-[#1e2430] bg-[#12151c] shadow-2xl">
              {(["Duration", "Calories", "Rating"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSortBy(option);
                    setIsSortOpen(false);
                  }}
                  className={`block w-full px-3 py-2 text-left text-xs transition ${
                    sortBy === option
                      ? "bg-[#1c222d] font-semibold text-[#ccff00]"
                      : "text-zinc-300 hover:bg-[#181d26] hover:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        {sortedList.length === 0 ? (
          <EmptyPlanState tab={activeTab} />
        ) : (
          <div className="space-y-4">
            {sortedList.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                isSavedTab={activeTab === "saved"}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
