import { motion } from 'framer-motion'
import TaskList from '../organisms/TaskList'
import ApperIcon from '../atoms/ApperIcon'

const Inbox = () => {
  const inboxFilter = (task) => !task.projectId

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
          <ApperIcon name="Inbox" size={18} className="text-gray-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          <p className="text-gray-600">Organize your tasks and ideas</p>
        </div>
      </div>

      <TaskList
        filter={inboxFilter}
        emptyTitle="Your inbox is empty"
        emptyDescription="Tasks you add without a project will appear here. Start by adding your first task above!"
        emptyIcon="Inbox"
        showProject={false}
      />
    </motion.div>
  )
}

export default Inbox