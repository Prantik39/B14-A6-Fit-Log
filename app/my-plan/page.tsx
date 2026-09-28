"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuChevronDown, LuClock, LuFlame, LuStar } from "react-icons/lu";
import { useWorkoutContext } from "@/context/WorkoutContext";
import EmptyPlanState from "@/components/EmptyPlanState";

export default function MyPlanPage() {
  const { todayPlan, savedList } = useWorkoutContext();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

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

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>Sort By</span>
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e2430] bg-[#101319] px-3 py-1.5 text-xs font-medium text-zinc-200">
            <span>Duration</span>
            <LuChevronDown className="h-3.5 w-3.5 text-zinc-400" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        {activeList.length === 0 ? (
          <EmptyPlanState tab={activeTab} />
        ) : (
          <div className="space-y-4">
            {activeList.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#1b2029] bg-[#101319] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-900 sm:h-20 sm:w-32">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white uppercase sm:text-lg">
                      {workout.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-400">
                      {workout.equipment}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
                      <div className="flex items-center gap-1">
                        <LuClock className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LuFlame className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{workout.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LuStar className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{workout.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="rounded-xl border border-[#252c3b] bg-[#131720] px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
