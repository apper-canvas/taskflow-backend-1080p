import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const Checkbox = ({ 
  checked = false, 
  onChange, 
  size = 'md',
  priority = 4,
  disabled = false,
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  }

  const priorityColors = {
    1: 'border-priority-1 hover:bg-red-50',
    2: 'border-priority-2 hover:bg-orange-50', 
    3: 'border-priority-3 hover:bg-blue-50',
    4: 'border-gray-300 hover:bg-gray-50'
  }

  const checkedColors = {
    1: 'bg-gradient-to-br from-red-500 to-red-600 border-red-600',
    2: 'bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600',
    3: 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-600', 
    4: 'bg-gradient-to-br from-green-500 to-green-600 border-green-600'
  }

  return (
    <motion.button
      className={`
        ${sizes[size]} rounded-full border-2 flex items-center justify-center
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed
        ${checked ? checkedColors[priority] : priorityColors[priority]}
        ${className}
      `}
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        scale: checked ? [1, 1.2, 1] : 1,
        rotate: checked ? [0, 360] : 0
      }}
      transition={{ 
        scale: { duration: 0.3, ease: "easeOut" },
        rotate: { duration: 0.4, ease: "easeInOut" }
      }}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ApperIcon 
            name="Check" 
            size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} 
            className="text-white"
          />
        </motion.div>
      )}
    </motion.button>
  )
}

export default Checkbox