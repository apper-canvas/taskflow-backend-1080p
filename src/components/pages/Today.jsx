import { motion } from 'framer-motion'
import TaskList from '../organisms/TaskList'
import ApperIcon from '../atoms/ApperIcon'

const Today = () => {
  const todayFilter = (task) => {
    if (!task.dueDate) return false
    const today = new Date().toDateString()
    const taskDate = new Date(task.dueDate).toDateString()
    return taskDate === today
  }

  const formatDate = () => {
    const today = new Date()
    return today.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
          <ApperIcon name="Calendar" size={18} className="text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Today</h1>
          <p className="text-gray-600">{formatDate()}</p>
        </div>
      </div>

      <TaskList
        filter={todayFilter}
        emptyTitle="Nothing planned for today"
        emptyDescription="You're all caught up! Add tasks due today to see them here."
        emptyIcon="Calendar"
      />
    </motion.div>
  )
}

export default Today