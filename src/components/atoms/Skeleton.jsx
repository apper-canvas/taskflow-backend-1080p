const Skeleton = ({ 
  width = 'w-full', 
  height = 'h-4', 
  rounded = 'rounded', 
  className = '' 
}) => {
  return (
    <div 
      className={`
        ${width} ${height} ${rounded} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
        animate-pulse shimmer ${className}
      `}
    />
  )
}

export default Skeleton