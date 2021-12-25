import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
    title: string
    id: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
}




function Todolist(props: PropsType) {

    

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");




    return (
         <div>
                <h3>{props.title}</h3>
                <div>
                    <input 
                    value={title} 
                    onChange={onChangeHandler}
                    onKeyPress={ onKeyPressHandler } />
                    <button onClick={ () => {
                        addTask();
                        setTitle("")
                        }} >+</button>
                </div>
                <ul>
                    {
                        props.tasks.map(t => {

                            const onClickHandler = () => props.removeTask(t.id)

                         return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/> 
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>    
                        </li>
                        })
                    }
                </ul>
                <div>
                    <button onClick={ onAllClickHandler }>All</button>
                    <button onClick={ onActiveClickHandler }>Active</button>
                    <button onClick={ onCompletedClickHandler }>Completed</button>
                </div>
            </div>
    )
}

export default Todolist