import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#1b1f28] bg-[#090b0e] py-8 text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
          <span className="font-display text-lg font-bold tracking-wider text-white">
            FITLOG
          </span>
        </div>

        <p className="text-center text-xs text-zinc-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
