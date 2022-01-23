import { v1 } from 'uuid';
import { TasksStateType } from '../App';

export type removeTaskACActionType={
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

export type SomeActionCreatorActionType2={
    type: '',
    id: string
}


type ActionsType = removeTaskACActionType | SomeActionCreatorActionType2

export const tasksReducer = (state: Array<TasksStateType>, action: ActionsType) => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        default:
            throw new Error(" I don't understand this type ")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string ): removeTaskACActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId }
 }
 
export const SomeAC2 = (id: string): SomeActionCreatorActionType2 => {
    return { type: '', id: id }
 }
