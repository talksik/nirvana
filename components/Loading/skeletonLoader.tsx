export default function SkeletonLoader() {
  return (
    <div className="w-full h-24 flex animate-pulse flex-row items-center justify-center space-x-5">
      <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
      <div className="flex flex-col space-y-3">
        <div className="w-60 bg-gray-300 h-6 rounded-md "></div>
        <div className="w-40 bg-gray-300 h-6 rounded-md "></div>
      </div>
    </div>
  );
}
