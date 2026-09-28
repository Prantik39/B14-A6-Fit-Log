import Image from "next/image";
import { LuArrowDown } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-[#1b2029] bg-[#101319] p-6 sm:p-10 lg:p-14">
        <div className="flex flex-col-reverse items-center justify-between gap-8 lg:flex-row lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <span className="font-display text-xs font-bold tracking-widest text-[#ccff00] uppercase">
              WORKOUT LIBRARY
            </span>

            <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <a
                href="#library"
                className="inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-6 py-3 font-display text-xs font-bold tracking-wider text-black uppercase transition hover:bg-[#b8e600] active:scale-95"
              >
                <span>BROWSE WORKOUTS</span>
                <LuArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="relative flex items-center justify-center">
              <Image
                src="/banner.png"
                alt="FitLog Hero Illustration"
                width={320}
                height={320}
                priority
                className="h-auto w-full max-w-[240px] object-contain sm:max-w-[300px] lg:max-w-[340px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
