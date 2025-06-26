import { useState } from 'react'
import { motion } from 'framer-motion'
import Checkbox from '../atoms/Checkbox'

const TaskCheckbox = ({ task, onToggle }) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggle = async () => {
    if (isCompleting) return
    
    setIsCompleting(true)
    
    // Add a small delay for animation
    setTimeout(() => {
      onToggle(task.id, !task.completed)
      setIsCompleting(false)
    }, 200)
  }

  return (
    <motion.div
      animate={isCompleting ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Checkbox
        checked={task.completed}
        onChange={handleToggle}
        priority={task.priority}
        disabled={isCompleting}
        size="md"
      />
    </motion.div>
  )
}

export default TaskCheckbox