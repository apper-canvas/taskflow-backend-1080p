import mockTasks from '../mockData/tasks.json'

class TaskService {
  constructor() {
    this.tasks = [...mockTasks]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.tasks]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const task = this.tasks.find(t => t.id === id)
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  }

  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const newTask = {
      id: String(Math.max(...this.tasks.map(t => parseInt(t.id)), 0) + 1),
      title: taskData.title,
      completed: false,
      priority: taskData.priority || 4,
      dueDate: taskData.dueDate || null,
      projectId: taskData.projectId || null,
      order: this.tasks.length,
      createdAt: new Date().toISOString()
    }
    
    this.tasks.push(newTask)
    return { ...newTask }
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = this.tasks.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks[index] = { ...this.tasks[index], ...updates }
    return { ...this.tasks[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = this.tasks.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks.splice(index, 1)
    return true
  }
}

export const taskService = new TaskService()