export default function WorkoutSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1b2029] bg-[#101319] p-0 animate-pulse">
      <div className="aspect-[16/10] w-full bg-[#161a22]" />

      <div className="p-5">
        <div className="mb-3 flex gap-2">
          <div className="h-4 w-12 rounded-full bg-[#1c222c]" />
          <div className="h-4 w-14 rounded-full bg-[#1c222c]" />
        </div>

        <div className="h-5 w-3/4 rounded bg-[#1c222c]" />
        <div className="mt-2 h-3 w-1/2 rounded bg-[#161a22]" />

        <div className="mt-5 flex items-center gap-4 border-t border-[#1b2029] pt-3">
          <div className="h-3 w-14 rounded bg-[#161a22]" />
          <div className="h-3 w-16 rounded bg-[#161a22]" />
          <div className="h-3 w-10 rounded bg-[#161a22]" />
        </div>
      </div>
    </div>
  );
}
