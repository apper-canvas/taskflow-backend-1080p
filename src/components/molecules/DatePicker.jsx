import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../atoms/Button'
import ApperIcon from '../atoms/ApperIcon'

const DatePicker = ({ date, onChange, size = 'sm' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (date) => {
    if (!date) return 'No date'
    
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const targetDate = new Date(date)
    
    if (targetDate.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (targetDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return targetDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  const getDateColor = (date) => {
    if (!date) return 'text-gray-500'
    
    const today = new Date()
    const targetDate = new Date(date)
    
    if (targetDate < today) {
      return 'text-red-600'
    } else if (targetDate.toDateString() === today.toDateString()) {
      return 'text-green-600'
    } else {
      return 'text-blue-600'
    }
  }

  const quickDates = [
    { label: 'Today', value: new Date() },
    { label: 'Tomorrow', value: (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d })() },
    { label: 'Next week', value: (() => { const d = new Date(); d.setDate(d.getDate() + 7); return d })() },
    { label: 'No date', value: null }
  ]

  const handleSelect = (value) => {
    onChange(value)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        className={`${getDateColor(date)} border border-gray-200`}
      >
        <ApperIcon name="Calendar" size={14} />
        {formatDate(date)}
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
              className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[120px]"
            >
              {quickDates.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSelect(item.value)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <ApperIcon name="Calendar" size={14} className="text-gray-400" />
                  {item.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DatePicker