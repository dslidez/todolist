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
 
 

 export const todolistsAPI = {
    getTodolist() {
        const promise = instance.get('todo-lists')
        return promise
    },
    createTodolist(title: string) {
        const promise =  instance.post('todo-lists', {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete(`todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
 }
 