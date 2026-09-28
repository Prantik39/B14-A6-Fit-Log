import Link from "next/link";

interface EmptyPlanStateProps {
  tab: "today" | "saved";
}

export default function EmptyPlanState({ tab }: EmptyPlanStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#1f2533] bg-[#0d1015]/50 py-20 text-center">
      <h3 className="font-display text-xl font-bold tracking-wider text-white uppercase sm:text-2xl">
        NOTHING HERE YET
      </h3>
      <p className="mt-2 text-xs text-zinc-400 sm:text-sm">
        {tab === "today"
          ? "Browse the library and add a lift to get today moving."
          : "Save exercises from the library to view them here later."}
      </p>
      <div className="mt-6">
        <Link
          href="/#library"
          className="inline-flex rounded-xl bg-[#ccff00] px-6 py-2.5 font-display text-xs font-bold tracking-wide text-black uppercase transition hover:bg-[#b8e600]"
        >
          Go to workouts
        </Link>
      </div>
    </div>
  );
}
