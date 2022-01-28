import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import {AddItemForm} from './AddItemForm';
import { FilterValuesType } from './App';
import { EditableSpan } from './EditableSpan';
import { Task } from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todolistId:string) => void
    changeFilter: (filter: FilterValuesType, id: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId:string) => void
    removeTask: (taskId: string, todolistId:string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId:string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}




const Todolist = React.memo ((props: PropsType) => {

    console.log('Todolist called')
    
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = useCallback ( (title: string) => props.addTask(title, props.id), [props.addTask, props.id] );
    const onAllClickHandler = useCallback ( () => props.changeFilter("all", props.id), [] );
    const onActiveClickHandler = useCallback ( () => props.changeFilter("active", props.id), []);
    const onCompletedClickHandler = useCallback ( () => props.changeFilter("completed", props.id), []);
    const removeTodolist = () => props.removeTodolist(props.id)

    const changeTodolistTitle =  useCallback ( (newTitle: string) => props.changeTodolistTitle(props.id, newTitle), [props.id,  props.changeTodolistTitle]);

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(
          (t) => t.isDone === false
        );
      }

      if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(
          (t) => t.isDone === true
        );
      }

    return (
         <div>
                <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/> 
                <IconButton onClick={removeTodolist}> <Delete /> </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <div>
                    {
                       tasksForTodolist.map(t => <Task
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.id}
                        key={t.id}
                       />)
                    }
                </div>
                <div>
                    <Button variant={props.filter === 'all'  ? "contained" : "outlined"} 
                            color={'default'}
                            onClick={ onAllClickHandler }>
                                All </Button>

                    <Button variant={props.filter === 'active' ? "contained" : "outlined"}
                            color={'primary'}
                            onClick={ onActiveClickHandler }
                            >Active</Button>
                    <Button variant={props.filter === 'completed' ? "contained" : "outlined"}
                            color={'secondary'}
                            onClick={ onCompletedClickHandler }>Completed</Button>
               </div>
            </div>
    )
})



export default Todolist