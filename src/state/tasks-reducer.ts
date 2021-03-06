import { Dispatch } from 'redux';
import { ApiTaskType, todolistsAPI } from '../api/todolists-api';
import { TasksStateType } from '../App';
import { setAppErrorAC, setAppStatusAC } from '../app/app-reducer';
import { TaskType } from '../Todolist';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolist-reducer';

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
 } 
 
export type removeTaskACActionType={
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string 
}
export type addTaskACActionType={
    type: 'ADD-TASK'
    task: ApiTaskType
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
type ActionsType = removeTaskACActionType 
| addTaskACActionType 
| changeTaskStatusACActionType 
| changeTaskTitleACActionType 
| AddTodolistActionType 
| RemoveTodolistActionType
| SetTodolistsActionType
| SetTasksActionType


const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
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
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
         }
         
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t =>  t.id === action.taskId 
                                                        ? {...t, isDone: action.isDone}
                                                        : t );
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            let stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
         }         
         
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string ): removeTaskACActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId }
 }
 
export const addTaskAC = (task: ApiTaskType): addTaskACActionType => {
    return {type: 'ADD-TASK', task}
 } 

// export const addTaskAC = (  title: string, todolistId: string ): addTaskACActionType => {
//     return { type: 'ADD-TASK', title, todolistId }
//  }

export const changeTaskStatusAC = ( taskId: string, isDone: boolean, todolistId: string): changeTaskStatusACActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, todolistId, isDone  }
 }
 
export const changeTaskTitlesAC = (taskId: string, title: string, todolistId: string): changeTaskTitleACActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId,  title, todolistId }
}

export const AddTodolistAC = (taskId: string, title: string, todolistId: string): changeTaskTitleACActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId,  title, todolistId }
}
export const setTasksAC = (tasks: Array<ApiTaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
 }
 
 export const fetchTasksTC = (todolistId: string) => {
        
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading')) 
        todolistsAPI.getTodolistTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded')) 
            })
    }
 }

 export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading')) 
    todolistsAPI.deleteTask(todolistId, taskId)
     .then(res => {
         const action = removeTaskAC(taskId, todolistId)
         dispatch(action)
         dispatch(setAppStatusAC('succeeded'))
     } )
 }
 
 export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
   todolistsAPI.createTask(todolistId, title)
       .then(res => {
           if (res.data.resultCode === 0) {
               const task = res.data.data.item
               dispatch(addTaskAC(task))
               dispatch(setAppStatusAC('succeeded'))
           } else {
               if (res.data.messages.length) {
                   dispatch(setAppErrorAC(res.data.messages[0]))
               } else {
                   dispatch(setAppErrorAC('Some error occurred'))
               }
               dispatch(setAppStatusAC('failed'))
           }
       })
       .catch((error) => {
           dispatch(setAppErrorAC(error.message))
           dispatch(setAppErrorAC('failed'))
       })
}


 export const changeTaskTitlesTC = (taskId: string, title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTask(taskId, title, todolistId)
    .then(res => {
        const action = changeTaskTitlesAC(taskId, title, todolistId)
        dispatch(action)
        dispatch(setAppStatusAC('succeeded'))
    } )
}


