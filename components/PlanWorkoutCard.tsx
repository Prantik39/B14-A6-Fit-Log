"use client";

import Image from "next/image";
import Link from "next/link";
import { LuCheck, LuX, LuClock, LuFlame, LuStar, LuPlus } from "react-icons/lu";
import { Workout } from "@/types/workout";
import { useWorkoutContext } from "@/context/WorkoutContext";

interface PlanWorkoutCardProps {
  workout: Workout;
  isSavedTab?: boolean;
}

export default function PlanWorkoutCard({
  workout,
  isSavedTab = false,
}: PlanWorkoutCardProps) {
  const {
    removeFromPlan,
    removeFromSaved,
    toggleMarkAsDone,
    isCompleted,
    addToPlan,
    isInPlan,
  } = useWorkoutContext();

  const completed = isCompleted(workout.id);
  const inPlan = isInPlan(workout.id);

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 transition ${
        completed
          ? "border-[#2e4018] bg-[#121812]"
          : "border-[#1b2029] bg-[#101319]"
      }`}
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
          <div className="flex items-center gap-2">
            <h3
              className={`font-display text-base font-bold uppercase sm:text-lg ${
                completed ? "text-zinc-400 line-through" : "text-white"
              }`}
            >
              {workout.name}
            </h3>
            {completed && (
              <span className="rounded-full bg-[#1b2713] border border-[#2e4018] px-2 py-0.5 text-[10px] font-bold text-[#ccff00] uppercase tracking-wider">
                Done
              </span>
            )}
          </div>

          <p className="mt-0.5 text-xs text-zinc-400">{workout.equipment}</p>

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

        {isSavedTab ? (
          <button
            type="button"
            onClick={() => addToPlan(workout)}
            disabled={inPlan}
            className={
              inPlan
                ? "inline-flex items-center gap-1.5 rounded-xl border border-[#2e4018] bg-[#1a2414] px-4 py-2 text-xs font-bold text-[#ccff00] uppercase cursor-not-allowed opacity-80"
                : "inline-flex items-center gap-1.5 rounded-xl bg-[#ccff00] px-4 py-2 text-xs font-bold text-black uppercase transition hover:bg-[#b8e600] active:scale-95"
            }
          >
            <LuPlus className="h-3.5 w-3.5" />
            <span>{inPlan ? "In Plan" : "Add to Plan"}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => toggleMarkAsDone(workout.id)}
            className={
              completed
                ? "inline-flex items-center gap-1.5 rounded-xl border border-[#2e4018] bg-[#1b2713] px-4 py-2 text-xs font-bold text-[#ccff00] uppercase transition hover:bg-[#233318]"
                : "inline-flex items-center gap-1.5 rounded-xl bg-[#ccff00] px-4 py-2 text-xs font-bold text-black uppercase transition hover:bg-[#b8e600] active:scale-95"
            }
          >
            <LuCheck className="h-3.5 w-3.5" />
            <span>{completed ? "Completed" : "Mark as Done"}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() =>
            isSavedTab
              ? removeFromSaved(workout.id)
              : removeFromPlan(workout.id)
          }
          className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-red-400 transition"
          title="Remove"
        >
          <LuX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
