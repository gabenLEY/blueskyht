const SkeletonFeed = () => {
  return (
    <div className="z-10 bg-white shadow-lg p-6 border-t border-gray-500 animate-pulse w-[400px]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div>
          <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
          <div className="w-24 h-3 bg-gray-200 rounded-md mt-2"></div>
        </div>
      </div>
      <div className="w-full h-16 bg-gray-200 rounded-md mt-4"></div>
      <div className="flex gap-8 items-center mt-4">
        <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  )
}

export default SkeletonFeed