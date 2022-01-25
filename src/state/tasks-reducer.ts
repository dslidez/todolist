import { v1 } from 'uuid';
import { TasksStateType } from '../App';

export type removeTaskACActionType={
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type addTaskACActionType={
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
export type changeTaskStatusACActionType={
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
export type changeTaskTitleACActionType={
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}


type ActionsType = removeTaskACActionType | addTaskACActionType | changeTaskStatusAC | changeTaskTitleAC

export const tasksReducer = (state: Array<TasksStateType>, action: ActionsType) => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            let newTask = { id: v1(), title: action.title, isDone: false };
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
              task.isDone = action.isDone;
            }
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
              task.title = action.title;
            }
            return stateCopy;
        }
        default:
            throw new Error(" I don't understand this type ")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string ): removeTaskACActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId }
 }
 
export const addTaskAC = (  title: string, todolistId: string ): addTaskACActionType => {
    return { type: 'ADD-TASK', title, todolistId }
 }

export const changeTaskStatusAC = ( taskId: string, isDone: boolean, todolistId: string): changeTaskStatusACActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, todolistId, isDone  }
 }
 
export const changeTaskTitlesAC = (taskId: string, title: string, todolistId: string): changeTaskTitleACActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId,  title, todolistId }
}