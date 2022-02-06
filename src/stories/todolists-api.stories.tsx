import React, {useEffect, useState} from 'react'
import axios from 'axios';

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
    axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    .then((res) => {
        setState(res.data);
    })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: "3todolist"}, settings)
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
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings).then( (res) => {
       setState(res.data);
    })    
   }, [])

   return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    const todolistId = '0699b22d-9eba-4047-ae9e-a69e0ecbfa4e'
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'NEWSECONDtodolist'}, settings)
       .then((res) => {
           setState(res.data)
       })    
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
