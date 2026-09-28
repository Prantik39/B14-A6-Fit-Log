"use client";

import Image from "next/image";
import Link from "next/link";
import { LuCalendar, LuBookmark, LuArrowLeft, LuCheck } from "react-icons/lu";
import { Workout } from "@/types/workout";
import { useWorkoutContext } from "@/context/WorkoutContext";

interface WorkoutDetailViewProps {
  workout: Workout;
}

export default function WorkoutDetailView({ workout }: WorkoutDetailViewProps) {
  const { addToPlan, saveForLater, isInPlan, isSaved, todayPlan } =
    useWorkoutContext();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const isPlanFull = todayPlan.length >= 5;

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets.toString() },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating.toString() },
  ];

  const handleAddToPlan = () => {
    addToPlan(workout);
  };

  const handleSaveForLater = () => {
    saveForLater(workout);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white"
        >
          <LuArrowLeft className="h-4 w-4" />
          <span>Back to Library</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#1b2029] bg-[#101319]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold tracking-wide text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-[#1b2029] bg-[#101319]">
              <div className="divide-y divide-[#1b2029] px-5">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between py-3 text-xs"
                  >
                    <span className="font-display font-semibold tracking-wider text-zinc-500 uppercase">
                      {spec.label}
                    </span>
                    <span className="font-medium text-zinc-200">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-sm font-bold tracking-wider text-white uppercase">
                INSTRUCTIONS
              </h2>
              <ol className="mt-3 space-y-3 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="font-bold text-zinc-300">
                      {index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToPlan}
              disabled={inPlan || (isPlanFull && !inPlan)}
              className={
                inPlan
                  ? "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2e4018] bg-[#1b2713] px-6 py-3.5 font-display text-xs font-bold tracking-wider text-[#ccff00] uppercase opacity-90"
                  : isPlanFull
                  ? "inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-800 px-6 py-3.5 font-display text-xs font-bold tracking-wider text-zinc-500 uppercase cursor-not-allowed"
                  : "inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3.5 font-display text-xs font-bold tracking-wider text-black uppercase transition hover:bg-[#b8e600] active:scale-95"
              }
            >
              {inPlan ? (
                <>
                  <LuCheck className="h-4 w-4" />
                  <span>In today&apos;s plan</span>
                </>
              ) : isPlanFull ? (
                <>
                  <LuCalendar className="h-4 w-4" />
                  <span>Plan full (5/5)</span>
                </>
              ) : (
                <>
                  <LuCalendar className="h-4 w-4" />
                  <span>Add to today&apos;s plan</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSaveForLater}
              disabled={saved}
              className={
                saved
                  ? "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#35435a] bg-[#141b26] px-6 py-3.5 font-display text-xs font-bold tracking-wider text-zinc-300 uppercase opacity-90"
                  : "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2a313e] bg-[#13161d] px-6 py-3.5 font-display text-xs font-bold tracking-wider text-white uppercase transition hover:bg-[#1b1f29] active:scale-95"
              }
            >
              <LuBookmark className="h-4 w-4" />
              <span>{saved ? "Saved for later" : "Save for later"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
