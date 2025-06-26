import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '../atoms/ApperIcon'
import Button from '../atoms/Button'
import Badge from '../atoms/Badge'
import { projectService } from '../../services/api/projectService'
import { taskService } from '../../services/api/taskService'

const Sidebar = ({ isMobileOpen, onMobileClose }) => {
  const [projects, setProjects] = useState([])
  const [taskCounts, setTaskCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [projectsData, tasksData] = await Promise.all([
        projectService.getAll(),
        taskService.getAll()
      ])
      
      setProjects(projectsData)
      
      // Calculate task counts
      const counts = {
        inbox: tasksData.filter(t => !t.completed && !t.projectId).length,
        today: tasksData.filter(t => {
          if (t.completed) return false
          if (!t.dueDate) return false
          const today = new Date().toDateString()
          return new Date(t.dueDate).toDateString() === today
        }).length,
        upcoming: tasksData.filter(t => {
          if (t.completed) return false
          if (!t.dueDate) return false
          const taskDate = new Date(t.dueDate)
          const today = new Date()
          const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
          return taskDate > today && taskDate <= weekFromNow
        }).length
      }
      
      // Project task counts
      projectsData.forEach(project => {
        counts[project.id] = tasksData.filter(t => !t.completed && t.projectId === project.id).length
      })
      
      setTaskCounts(counts)
    } catch (error) {
      console.error('Failed to load sidebar data:', error)
    } finally {
      setLoading(false)
    }
  }

  const navItems = [
    { 
      path: '/inbox', 
      icon: 'Inbox', 
      label: 'Inbox', 
      count: taskCounts.inbox,
      color: 'text-gray-600'
    },
    { 
      path: '/today', 
      icon: 'Calendar', 
      label: 'Today', 
      count: taskCounts.today,
      color: 'text-green-600'
    },
    { 
      path: '/upcoming', 
      icon: 'CalendarDays', 
      label: 'Upcoming', 
      count: taskCounts.upcoming,
      color: 'text-blue-600'
    }
  ]

  const sidebarContent = (
    <div className="h-full flex flex-col bg-secondary">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-red-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="CheckSquare" size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onMobileClose}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
              ${isActive 
                ? 'bg-white shadow-sm border border-gray-200 text-gray-900' 
                : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
              }
            `}
          >
            <ApperIcon name={item.icon} size={18} className={item.color} />
            <span className="flex-1 font-medium">{item.label}</span>
            {item.count > 0 && (
              <Badge variant="default" size="xs">
                {item.count}
              </Badge>
            )}
          </NavLink>
        ))}

        {/* Projects */}
        <div className="pt-6">
          <div className="flex items-center justify-between px-3 py-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Projects
            </h3>
            <Button variant="ghost" size="sm" className="p-1">
              <ApperIcon name="Plus" size={16} />
            </Button>
          </div>

          <div className="space-y-1 mt-2">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2">
                    <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
                    <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              projects.map((project) => (
                <NavLink
                  key={project.id}
                  to={`/project/${project.id}`}
                  onClick={onMobileClose}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-white shadow-sm border border-gray-200 text-gray-900' 
                      : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                    }
                  `}
                >
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="flex-1 font-medium truncate">
                    {project.icon} {project.name}
                  </span>
                  {taskCounts[project.id] > 0 && (
                    <Badge variant="default" size="xs">
                      {taskCounts[project.id]}
                    </Badge>
                  )}
                </NavLink>
              ))
            )}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <ApperIcon name="Keyboard" size={16} />
          <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">⌘N</kbd> to add task</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 h-screen border-r border-gray-200 bg-secondary">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={onMobileClose}
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 h-full w-80 z-50 shadow-xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar