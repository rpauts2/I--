const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6]?.map((item) => (
        <div key={item} className="bg-card border-2 border-border overflow-hidden animate-pulse">
          {/* Thumbnail Skeleton */}
          <div className="h-48 bg-muted"></div>
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-6 bg-muted w-3/4"></div>
            <div className="h-4 bg-muted w-full"></div>
            <div className="h-4 bg-muted w-5/6"></div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-muted w-16"></div>
              <div className="h-6 bg-muted w-16"></div>
              <div className="h-6 bg-muted w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;