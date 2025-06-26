import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCheckbox from './TaskCheckbox'
import Badge from '../atoms/Badge'
import Button from '../atoms/Button'
import ApperIcon from '../atoms/ApperIcon'

const TaskItem = ({ 
  task, 
  onToggle, 
  onEdit, 
  onDelete, 
  showProject = true,
  projects = [] 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const project = projects.find(p => p.id === task.projectId)
  
  const formatDate = (date) => {
    if (!date) return null
    
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const targetDate = new Date(date)
    
    if (targetDate.toDateString() === today.toDateString()) {
      return { text: 'Today', color: 'text-green-600' }
    } else if (targetDate.toDateString() === tomorrow.toDateString()) {
      return { text: 'Tomorrow', color: 'text-blue-600' }
    } else if (targetDate < today) {
      return { text: 'Overdue', color: 'text-red-600' }
    } else {
      return { 
        text: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        color: 'text-gray-600'
      }
    }
  }

  const dateInfo = formatDate(task.dueDate)

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (editTitle.trim() && editTitle !== task.title) {
      onEdit(task.id, { title: editTitle.trim() })
    }
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setEditTitle(task.title)
    setIsEditing(false)
  }

  if (task.completed) {
    return (
      <motion.div
        layout
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: 0.6,
          scale: 0.98
        }}
        exit={{ 
          opacity: 0, 
          x: 100,
          transition: { duration: 0.2 }
        }}
        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
      >
        <TaskCheckbox task={task} onToggle={onToggle} />
        <span className="flex-1 text-gray-500 line-through">{task.title}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="opacity-60 hover:opacity-100"
        >
          <ApperIcon name="Trash2" size={14} />
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
      className={`
        group flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100
        transition-all duration-200 hover:shadow-card-hover hover:border-gray-200
        ${isHovered ? 'bg-gray-50/50' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TaskCheckbox task={task} onToggle={onToggle} />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleEditCancel}
              onKeyDown={(e) => {
                if (e.key === 'Escape') handleEditCancel()
              }}
              className="flex-1 px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </form>
        ) : (
          <div className="space-y-1">
            <p 
              className="text-gray-900 cursor-pointer hover:text-gray-700"
              onClick={() => setIsEditing(true)}
            >
              {task.title}
            </p>
            
            <div className="flex items-center gap-2 text-xs">
              {showProject && project && (
                <Badge 
                  className="text-xs"
                  style={{ 
                    backgroundColor: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}30`
                  }}
                >
                  {project.icon} {project.name}
                </Badge>
              )}
              
              {task.priority < 4 && (
                <Badge priority={task.priority} size="xs">
                  P{task.priority}
                </Badge>
              )}
              
              {dateInfo && (
                <span className={`${dateInfo.color} font-medium`}>
                  {dateInfo.text}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {(isHovered || isEditing) && !isEditing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="opacity-60 hover:opacity-100"
            >
              <ApperIcon name="Edit2" size={14} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="opacity-60 hover:opacity-100 text-red-600 hover:text-red-700"
            >
              <ApperIcon name="Trash2" size={14} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskItem