import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Badge from '../atoms/Badge'

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/project/${project.id}`}
        className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-card-hover transition-all duration-200"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: project.color }}
            />
            <h3 className="font-medium text-gray-900 truncate">
              {project.icon} {project.name}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="default" size="sm">
            {project.taskCount} tasks
          </Badge>
          
          <div 
            className="w-8 h-1 rounded-full opacity-60"
            style={{ backgroundColor: project.color }}
          />
        </div>
      </Link>
    </motion.div>
  )
}

export default ProjectCard