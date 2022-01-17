import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';

export type RemoveTodolistActionType={
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType={
    type: 'ADD-TODOLIST',
    title: string
}

export type ChangeTodolistActionType={
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeTodolistFilterActionType={
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistActionType | ChangeTodolistFilterActionType 

export const todolistReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "all",
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find((tl) => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find((tl) => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }





        default:
            throw new Error(" I don't understand this type ")
    }
}