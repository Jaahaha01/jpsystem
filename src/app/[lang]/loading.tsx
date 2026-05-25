export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center bg-white">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute h-full w-full animate-ping rounded-full bg-slate-200 opacity-75"></div>
        <div className="relative h-8 w-8 rounded-full bg-slate-400"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">Loading...</p>
    </div>
  );
}
