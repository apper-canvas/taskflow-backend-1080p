import Skeleton from '../atoms/Skeleton'

const LoadingState = ({ type = 'tasks', count = 5 }) => {
  if (type === 'tasks') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100">
            <Skeleton width="w-5" height="h-5" rounded="rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton width="w-3/4" height="h-4" />
              <div className="flex items-center gap-2">
                <Skeleton width="w-16" height="h-3" rounded="rounded-full" />
                <Skeleton width="w-12" height="h-3" rounded="rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'projects') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="p-4 bg-white rounded-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton width="w-3" height="h-3" rounded="rounded-full" />
              <Skeleton width="w-32" height="h-4" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton width="w-16" height="h-5" rounded="rounded-full" />
              <Skeleton width="w-8" height="h-1" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} height="h-16" />
      ))}
    </div>
  )
}

export default LoadingState