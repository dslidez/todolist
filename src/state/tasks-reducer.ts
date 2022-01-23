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
export type changeTaskStatusAC={
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    id: string
    isDone: boolean
}


type ActionsType = removeTaskACActionType | addTaskACActionType | changeTaskStatusAC

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

export const changeTaskStatusAC = ( id: string, isDone: boolean, todolistId: string): addTaskACActionType => {
    return { type: 'ADD-TASK', id, todolistId, isDone  }
 }
