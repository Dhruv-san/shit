export default function NewsLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-48 bg-blue-900/30 rounded-lg"></div>
        <div className="h-4 w-64 bg-blue-900/20 rounded-lg"></div>
      </div>
      
      {/* Filter buttons skeleton */}
      <div className="flex flex-wrap gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-24 bg-blue-900/30 rounded-full"></div>
        ))}
      </div>
      
      {/* News cards skeleton */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-blue-900/10 rounded-xl p-4 space-y-4">
            <div className="h-48 bg-blue-900/20 rounded-lg"></div>
            <div className="flex justify-between">
              <div className="h-6 w-24 bg-blue-900/30 rounded-full"></div>
              <div className="h-6 w-24 bg-blue-900/20 rounded-lg"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 w-full bg-blue-900/30 rounded-lg"></div>
              <div className="h-6 w-3/4 bg-blue-900/30 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
