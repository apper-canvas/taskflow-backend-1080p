import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../atoms/Button'
import ApperIcon from '../atoms/ApperIcon'

const PrioritySelector = ({ priority = 4, onChange, size = 'sm' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const priorities = [
    { level: 1, label: 'P1', color: 'text-red-600', bg: 'bg-red-50' },
    { level: 2, label: 'P2', color: 'text-orange-600', bg: 'bg-orange-50' },
    { level: 3, label: 'P3', color: 'text-blue-600', bg: 'bg-blue-50' },
    { level: 4, label: 'P4', color: 'text-gray-600', bg: 'bg-gray-50' }
  ]

  const currentPriority = priorities.find(p => p.level === priority)

  const handleSelect = (level) => {
    onChange(level)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        className={`${currentPriority.color} ${currentPriority.bg} border border-gray-200`}
      >
        <ApperIcon name="Flag" size={14} />
        {currentPriority.label}
        <ApperIcon name="ChevronDown" size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.1 }}
              className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[100px]"
            >
              {priorities.map((p) => (
                <button
                  key={p.level}
                  onClick={() => handleSelect(p.level)}
                  className={`
                    w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2
                    ${p.color} ${priority === p.level ? 'bg-gray-50' : ''}
                  `}
                >
                  <ApperIcon name="Flag" size={14} />
                  {p.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PrioritySelector