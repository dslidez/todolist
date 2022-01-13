import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import AddItemForm from './AddItemForm';
import { FilterValuesType } from './App';

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todolistId:string) => void
    removeTask: (taskId: string, todolistId:string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId:string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}




function Todolist(props: PropsType) {

    
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = (title: string) => props.addTask(title, props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodolist(props.id)



    return (
         <div>
                <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {
                        props.tasks.map(t => {

                            const onClickHandler = () => props.removeTask(t.id,  props.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                props.changeTaskStatus(t.id, newIsDoneValue,  props.id)
                            }



                         return <li key={t.id} className={t.isDone ? "is-done" : "" }>
                            <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/> 
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>    
                        </li>
                        })
                    }
                </ul>
                <div>
                    <button className={props.filter === 'all' ? "active-filter" : ""} 
                            onClick={ onAllClickHandler }>All</button>

                    <button className={props.filter === 'active' ? "active-filter" : ""}
                            onClick={ onActiveClickHandler }>Active</button>

                    <button className={props.filter === 'completed' ? "active-filter" : ""}
                            onClick={ onCompletedClickHandler }>Completed</button>
                </div>
            </div>
    )
}



export default Todolist