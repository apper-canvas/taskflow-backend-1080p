import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'default',
  priority,
  size = 'sm',
  className = '' 
}) => {
  const baseClasses = `
    inline-flex items-center font-medium rounded-full
    transition-all duration-200
  `
  
  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-sm'
  }

  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-gradient-to-r from-primary/10 to-red-100 text-primary border border-primary/20',
    success: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200',
    warning: 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border border-yellow-200',
    error: 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200',
    info: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200'
  }

  const priorityVariants = {
    1: 'priority-1 border border-red-200',
    2: 'priority-2 border border-orange-200', 
    3: 'priority-3 border border-blue-200',
    4: 'priority-4 border border-gray-200'
  }

  const getVariantClass = () => {
    if (priority) return priorityVariants[priority]
    return variants[variant]
  }

  return (
    <motion.span
      className={`${baseClasses} ${sizes[size]} ${getVariantClass()} ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.span>
  )
}

export default Badge