import { motion } from 'framer-motion'
import TaskList from '../organisms/TaskList'
import ApperIcon from '../atoms/ApperIcon'

const Upcoming = () => {
  const upcomingFilter = (task) => {
    if (!task.dueDate) return false
    const taskDate = new Date(task.dueDate)
    const today = new Date()
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    // Include overdue tasks and tasks in the next 7 days
    return taskDate >= today && taskDate <= weekFromNow
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
          <ApperIcon name="CalendarDays" size={18} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upcoming</h1>
          <p className="text-gray-600">Next 7 days</p>
        </div>
      </div>

      <TaskList
        filter={upcomingFilter}
        emptyTitle="Nothing scheduled ahead"
        emptyDescription="Tasks with due dates in the next 7 days will appear here."
        emptyIcon="CalendarDays"
      />
    </motion.div>
  )
}

export default Upcoming