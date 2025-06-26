import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import QuickAddBar from '../molecules/QuickAddBar'
import Button from '../atoms/Button'
import ApperIcon from '../atoms/ApperIcon'
import { taskService } from '../../services/api/taskService'
import { toast } from 'react-toastify'

const Layout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      toast.success('Task added successfully! ✨')
      
      // Reload the page to show the new task
      window.location.reload()
    } catch (error) {
      toast.error('Failed to add task')
      console.error('Failed to add task:', error)
    }
  }

  return (
    <div className="h-screen flex bg-background">
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-red-600 rounded flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900">TaskFlow</span>
          </div>
          
          <div className="w-8" /> {/* Spacer for centering */}
        </div>

        <QuickAddBar onAddTask={handleAddTask} />
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout