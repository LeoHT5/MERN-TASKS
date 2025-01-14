import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      // Obtiene solo el task solo del usuario autentificacdo o logeado
      user: req.user.id
    }).populate('user')// relaciona el task con los datos del usuario
    res.json(tasks)
  } catch (error) {
    return res.status(404).json({ message: 'Something went wrong' })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body

    console.log(req.user)

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id
    })
    const savedTask = await newTask.save()
    res.json(savedTask)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user')
    if (!task) return res.status(404).json({ message: 'Task no found' })
    res.json(task)
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: 'Task no found - delete' })
    return res.sendStatus(204)// Estado: salio exitoso pero no devuelve nada
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' })
  }
}

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!task) return res.status(404).json({ message: 'Task no found - update' })
    res.json(task)
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' })
  }
}
