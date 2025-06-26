import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import { projectService } from "@/services/api/projectService";
import TaskItem from "@/components/molecules/TaskItem";
import EmptyState from "@/components/molecules/EmptyState";
import LoadingState from "@/components/molecules/LoadingState";
import AppIcon from "@/components/atoms/AppIcon";

const TaskList = ({ 
  filter = () => true, 
  title,
  emptyTitle,
  emptyDescription,
  emptyIcon = 'Inbox',
  showProject = true 
}) => {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [tasksData, projectsData] = await Promise.all([
        taskService.getAll(),
        projectService.getAll()
      ])
      setTasks(tasksData)
      setProjects(projectsData)
    } catch (error) {
      setError('Failed to load tasks')
      console.error('Failed to load tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleTask = async (taskId, completed) => {
    try {
      // Optimistic update
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, completed } : task
      ))

      // If completing the task, show success message
      if (completed) {
        const task = tasks.find(t => t.id === taskId)
        toast.success(`Task "${task?.title}" completed! 🎉`)
      }

      await taskService.update(taskId, { completed })
    } catch (error) {
      // Revert optimistic update
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, completed: !completed } : task
      ))
      toast.error('Failed to update task')
    }
  }

  const handleEditTask = async (taskId, updates) => {
    try {
      // Optimistic update
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ))

      await taskService.update(taskId, updates)
      toast.success('Task updated')
    } catch (error) {
      // Revert on error
      loadData()
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      // Optimistic update
      const taskToDelete = tasks.find(t => t.id === taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))

      await taskService.delete(taskId)
      toast.success(`Task "${taskToDelete?.title}" deleted`)
    } catch (error) {
      // Revert on error
      loadData()
      toast.error('Failed to delete task')
    }
  }

  if (loading) {
    return <LoadingState type="tasks" />
  }

  if (error) {
    return (
      <EmptyState
        icon="AlertCircle"
        title="Something went wrong"
        description={error}
        action={loadData}
        actionLabel="Try again"
      />
    )
  }

  const filteredTasks = tasks.filter(filter)
  const incompleteTasks = filteredTasks.filter(t => !t.completed)
  const completedTasks = filteredTasks.filter(t => t.completed)

  if (filteredTasks.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Incomplete Tasks */}
      {incompleteTasks.length > 0 && (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {incompleteTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                projects={projects}
                showProject={showProject}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

{/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <AppIcon name="Check" size={16} />
            Completed ({completedTasks.length})
          </div>
          <AnimatePresence>
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                projects={projects}
                showProject={showProject}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default TaskList