import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { todolistsAPI } from '../api/todolists-api';

export default {
   title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'fc086433-a3b2-4e29-b729-0bb49b9ccb7d'
    } 
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
    const title = 'YUUUUUUHOOO' 
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
    const todolistId = '4623d255-f888-4f5f-8da9-c5cb0bb01414';
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
