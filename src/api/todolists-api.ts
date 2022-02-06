import React, {useEffect, useState} from 'react'
import axios from 'axios';

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
         // Не забываем заменить API-KEY на собственный
        'API-KEY': 'fc086433-a3b2-4e29-b729-0bb49b9ccb7d'
    }
 })
 
 type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
 }
 
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
        const promise = instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistId}`, {title})
        return promise
    },
 }
 