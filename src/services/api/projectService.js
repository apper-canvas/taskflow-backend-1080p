import mockProjects from '../mockData/projects.json'

class ProjectService {
  constructor() {
    this.projects = [...mockProjects]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250))
    return [...this.projects]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const project = this.projects.find(p => p.id === id)
    if (!project) {
      throw new Error('Project not found')
    }
    return { ...project }
  }

  async create(projectData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newProject = {
      id: String(Math.max(...this.projects.map(p => parseInt(p.id)), 0) + 1),
      name: projectData.name,
      color: projectData.color || '#6B7280',
      icon: projectData.icon || '📁',
      order: this.projects.length,
      taskCount: 0
    }
    
    this.projects.push(newProject)
    return { ...newProject }
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    
    this.projects[index] = { ...this.projects[index], ...updates }
    return { ...this.projects[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    
    this.projects.splice(index, 1)
    return true
  }
}

export const projectService = new ProjectService()