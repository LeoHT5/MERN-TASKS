/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react"
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/tasks'

const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider')
    }

    return context
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task)
            setTasks([...tasks, res.data]) // Actualiza el estado de las tareas
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            if (res.status === 204) {
                setTasks(tasks.filter((tasks) => tasks._id !== id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task)
            setTasks(tasks.map(t => (t._id === id ? res.data : t))) // Actualiza el estado de las tareas
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                getTasks,
                deleteTask,
                updateTask,
                getTask,
            }}>
            {children}
        </TaskContext.Provider>
    )
}