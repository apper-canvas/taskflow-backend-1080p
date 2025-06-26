import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import TaskList from '../organisms/TaskList'
import LoadingState from '../molecules/LoadingState'
import EmptyState from '../molecules/EmptyState'
import ApperIcon from '../atoms/ApperIcon'
import { projectService } from '../../services/api/projectService'

const ProjectView = () => {
  const { projectId } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProject()
  }, [projectId])

  const loadProject = async () => {
    try {
      setLoading(true)
      setError('')
      const projectData = await projectService.getById(projectId)
      setProject(projectData)
    } catch (error) {
      setError('Failed to load project')
      console.error('Failed to load project:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingState type="tasks" />
  }

  if (error || !project) {
    return (
      <EmptyState
        icon="AlertCircle"
        title="Project not found"
        description="The project you're looking for doesn't exist or has been deleted."
        action={() => window.history.back()}
        actionLabel="Go back"
      />
    )
  }

  const projectFilter = (task) => task.projectId === projectId

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ 
            backgroundColor: `${project.color}20`,
            border: `1px solid ${project.color}40`
          }}
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: project.color }}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {project.icon} {project.name}
          </h1>
          <p className="text-gray-600">Project tasks and progress</p>
        </div>
      </div>

      <TaskList
        filter={projectFilter}
        emptyTitle={`No tasks in ${project.name}`}
        emptyDescription="Add tasks to this project to see them here. Use the quick add bar above!"
        emptyIcon="FolderOpen"
        showProject={false}
      />
    </motion.div>
  )
}

export default ProjectView