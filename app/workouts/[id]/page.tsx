import Link from "next/link";
import { getWorkoutById } from "@/services/workoutApi";
import WorkoutDetailView from "@/components/WorkoutDetailView";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-white uppercase sm:text-3xl">
          Workout Not Found
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          The requested exercise could not be located.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-[#ccff00] px-5 py-2.5 font-display text-xs font-bold tracking-wide text-black uppercase hover:bg-[#b8e600]"
        >
          Back to Library
        </Link>
      </main>
    );
  }

  return (
    <main className="py-6 sm:py-10">
      <WorkoutDetailView workout={workout} />
    </main>
  );
}
