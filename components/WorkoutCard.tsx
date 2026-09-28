import Link from "next/link";
import Image from "next/image";
import { LuClock, LuFlame, LuStar } from "react-icons/lu";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-[#1b2029] bg-[#101319] transition hover:-translate-y-1 hover:border-[#354819]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#ccff00] px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-black uppercase"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold tracking-wide text-white uppercase transition group-hover:text-[#ccff00]">
          {workout.name}
        </h3>

        <p className="mt-1 text-xs text-zinc-400">{workout.equipment}</p>

        <div className="mt-4 flex items-center gap-4 border-t border-[#1b2029] pt-3 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <LuClock className="h-3.5 w-3.5 text-zinc-500" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <LuFlame className="h-3.5 w-3.5 text-zinc-500" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <LuStar className="h-3.5 w-3.5 text-zinc-500" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
