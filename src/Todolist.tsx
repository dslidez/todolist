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
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}




function Todolist(props: PropsType) {

    

    let [title, setTitle] = useState("")
    let [error, setErorr] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim())
            setTitle("");
        } else {
            setErorr("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setErorr(null);
        if (e.key === 'Enter') {
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
                    onKeyPress={ onKeyPressHandler }
                    className={error ? "error" : ""}
                    />
                    <button onClick={ () => {
                        addTask();
                        setTitle("")
                        }} >+</button>
                    { error && <div className='error-message'>{error}</div>}
                </div>
                <ul>
                    {
                        props.tasks.map(t => {

                            const onClickHandler = () => props.removeTask(t.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                props.changeTaskStatus(t.id, newIsDoneValue)
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