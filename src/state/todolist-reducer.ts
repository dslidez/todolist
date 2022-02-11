import { Dispatch } from 'redux';
import { v1 } from 'uuid';
import { todolistsAPI } from '../api/todolists-api';
import { FilterValuesType, TodolistType } from '../App';
import { setAppStatusAC } from '../app-reducer';

export type RemoveTodolistActionType={
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType={
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType={
    type: 'CHANGE-TODOLIST-TITLE'
    id: string,
    title: string
}

export type ChangeTodolistFilterActionType={
    type: 'CHANGE-TODOLIST-FILTER'
    id: string,
    filter: FilterValuesType
}


type ActionsType = RemoveTodolistActionType 
| AddTodolistActionType 
| ChangeTodolistTitleActionType 
| ChangeTodolistFilterActionType 
| SetTodolistsActionType

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
 }
 

const initialState: Array<TodolistType> = []

export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
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
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all' 
            }))
         }
         




        default:
            return state;
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
 }
 
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title , todolistId: v1() }
 }

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
 }
 
export const ChangeTodolistFilterAC = ( filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER',filter: filter ,  id: id}
 }
 
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
 }
 
export const fetchTodolistsTC = () => {
 return (dispatch: Dispatch) => {
     dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
 }
}
export const removeTodolistTC = (todolistId: string) => {
 return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(RemoveTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
 }
}
export const addTodolistTC = (title: string) => {
 return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(AddTodolistAC(title))
            dispatch(setAppStatusAC('succeeded'))
        })
 }
}

export const ChangeTodolistTitleTC = (id: string, title: string) => {
 return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(ChangeTodolistTitleAC(id, title))
            dispatch(setAppStatusAC('succeeded'))
        })
 }
}