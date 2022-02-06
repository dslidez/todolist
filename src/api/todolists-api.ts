import React, {useEffect, useState} from 'react'
import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'fc086433-a3b2-4e29-b729-0bb49b9ccb7d'
    } 
 }
 

 export const todolistsAPI = {
    getTodolist() {
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodolist(title: string) {
        const promise =  axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
        return promise
    },
 }
 