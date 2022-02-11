import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback} from 'react';
import { EditableSpan } from './EditableSpan';
import { TaskType } from './Todolist';

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId:string) => void
    removeTask: (taskId: string, todolistId:string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId:string) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo ( (props: TaskPropsType) => {
            const onClickHandler = () => props.removeTask(props.task.id,  props.todolistId)
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked;
                props.changeTaskStatus(props.task.id, newIsDoneValue,  props.todolistId)
            }
            const onChangeTitleHandler = useCallback( (newValue: string) => {
               props.changeTaskTitle(props.task.id, newValue,  props.todolistId)
            }, [props.changeTaskTitle, props.task.id, props.todolistId])



         return <div key={props.task.id} className={props.task.isDone ? "is-done" : "" }>
            <Checkbox color='secondary' onChange={onChangeStatusHandler} checked={props.task.isDone}/> 
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />  
            <IconButton onClick={onClickHandler}> <Delete/> </IconButton>    
        </div>
})
