import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { todolistsAPI } from '../api/todolists-api';

export default {
   title: 'API'
}


export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    todolistsAPI.getTodolist()
    .then((res) => {
        setState(res.data);
    })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    const title = 'SHOPPING' 
    todolistsAPI.createTodolist(title)
    .then( (res) => {
        setState(res.data);
     } )     
   }, [])

   return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistId = '5f5d1a01-106c-40c8-af21-ccdfd6826aa0';
    todolistsAPI.deleteTodolist(todolistId)
    .then( (res) => {
       setState(res.data);
    })    
   }, [])

   return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistId = '0699b22d-9eba-4047-ae9e-a69e0ecbfa4e'
    todolistsAPI.updateTodolist(todolistId, 'NEW_TITLE_UPDATED')
       .then((res) => {
           setState(res.data)
       })    
   }, [])

   return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    const todolistId = 'b88154a9-1fa8-4cfd-8fc9-c67692f352e1'
     todolistsAPI.getTodolistTasks(todolistId)
     .then((res) => {
         setState(res.data);
     })
    }, [])
 
    return <div> {JSON.stringify(state)}</div>
 }

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    const todolistId = 'b88154a9-1fa8-4cfd-8fc9-c67692f352e1'
    const title = 'BUY lololo'
     todolistsAPI.createTask(todolistId, title)
     .then((res) => {
         setState(res.data);
     })
    }, [])
 
    return <div> {JSON.stringify(state)}</div>
 }
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    const todolistId = '0699b22d-9eba-4047-ae9e-a69e0ecbfa4e'
    const taskId = 'c71e03b2-e113-49b9-a2fe-b8ac175b62ec'
     todolistsAPI.deleteTask(todolistId, taskId)
     .then((res) => {
         setState(res.data);
     })
    }, [])
 
    return <div> {JSON.stringify(state)}</div>
 }

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    const todolistId = '0699b22d-9eba-4047-ae9e-a69e0ecbfa4e'
    const taskId = '3aa7bbed-7805-4f53-b35e-39880ea248f3'
    const title = 'NEWTITLELOLOLOLO'
     todolistsAPI.updateTask(todolistId, taskId, title)
     .then((res) => {
         setState(res.data);
     })
    }, [])
 
    return <div> {JSON.stringify(state)}</div>
 }