import Link from "next/link";
import Image from "next/image";
import { LuArrowLeft } from "react-icons/lu";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="FitLog Logo"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
        <span className="font-display text-2xl font-bold tracking-wider text-white">
          FITLOG
        </span>
      </div>

      <div className="font-display mt-8 text-7xl font-extrabold tracking-tight text-[#ccff00] sm:text-8xl">
        404
      </div>

      <h1 className="font-display mt-4 text-2xl font-bold tracking-wide text-white uppercase sm:text-3xl">
        Page Not Found
      </h1>

      <p className="mt-2 max-w-md text-xs text-zinc-400 sm:text-sm">
        The workout routine or page you are looking for does not exist or has
        been relocated.
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3 font-display text-xs font-bold tracking-wider text-black uppercase transition hover:bg-[#b8e600] active:scale-95"
        >
          <LuArrowLeft className="h-4 w-4" />
          <span>Back to Workouts</span>
        </Link>
      </div>
    </main>
  );
}
