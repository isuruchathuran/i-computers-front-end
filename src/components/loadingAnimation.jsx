export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-[90px] h-[90px] rounded-full border-8 border-transparent border-t-accent border-r-blue-400 animate-spin"></div>
      <p className="text-sm text-gray-500 font-semibold animate-pulse">
        Loading...
      </p>
    </div>
  );
}


