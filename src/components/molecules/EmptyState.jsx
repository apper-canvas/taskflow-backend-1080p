import { motion } from 'framer-motion'
import ApperIcon from '../atoms/ApperIcon'
import Button from '../atoms/Button'

const EmptyState = ({ 
  icon = 'Inbox',
  title,
  description,
  action,
  actionLabel,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        flex flex-col items-center justify-center py-16 px-8 text-center
        bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100
        ${className}
      `}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} size={32} className="text-gray-400" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-xl font-semibold text-gray-900 mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="text-gray-600 mb-8 max-w-md"
      >
        {description}
      </motion.p>
      
      {action && actionLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Button onClick={action} variant="primary" size="lg">
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default EmptyState