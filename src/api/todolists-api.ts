import axios from 'axios';
import {TodolistType} from '../App'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'fc086433-a3b2-4e29-b729-0bb49b9ccb7d'
    } 
 }
 const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fc086433-a3b2-4e29-b729-0bb49b9ccb7d'
    }
 })
 
//  export type TodolistType= {
//     id: string
//     addedDate: string
//     order: number
//     title: string
//  }
 
 type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
 }
 type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
 }
 type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
 }
 
 type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
 }

 export type ApiTaskType ={
    isDone: boolean
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id:string
    todoListId: string
    order: number
    addedDate: string
 }

 type GetTasksResponseType = {
     error: string | null
     totalCount: number
     items: ApiTaskType[]
 }

 type CreateTaskType= {
    resultCode: number
    messages: Array<string>
    data: {}
 }
 

 export const todolistsAPI = {
    getTodolist() {
        const promise = instance.get<Array<TodolistType>>('todo-lists')
        return promise
    },

    createTodolist(title: string) {
        const promise =  instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
        return promise
    },

    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
        return promise
    },

    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<UpdateT odolistResponseType>(`todo-lists/${todolistId}`, {title})
        return promise
    },

    getTodolistTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
        return promise
    },

    createTask(todolistId: string, title: string) {
        const promise =  instance.post<ResponseType<{item: ApiTaskType}>>(`todo-lists/${todolistId}/tasks`,{title})
        return promise
    },

    deleteTask(todolistId: string, taskId: string) {
        const promise =  instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    //title, description, completed, status, priority...
    updateTask(taskId: string, title: string, todolistId: string) {
        const promise =  instance.put<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
        return promise
    },
 }
 