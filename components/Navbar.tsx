"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkoutContext } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedList } = useWorkoutContext();

  const planCount = todayPlan.length;
  const savedCount = savedList.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1b1f28] bg-[#0c0e12]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          <span className="font-display text-xl font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "rounded-full border border-[#2e4018] bg-[#1a2414] px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#ccff00]"
                : "rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-400 hover:text-white"
            }
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={
              pathname === "/my-plan"
                ? "rounded-full border border-[#2e4018] bg-[#1a2414] px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#ccff00]"
                : "rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-400 hover:text-white"
            }
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white"
          >
            <span>Plan</span>
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-xs font-bold text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full border border-zinc-700 px-1.5 text-xs text-zinc-300">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
