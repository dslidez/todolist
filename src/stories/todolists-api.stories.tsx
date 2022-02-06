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
