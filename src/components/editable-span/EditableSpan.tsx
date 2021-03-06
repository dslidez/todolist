import { TextField } from '@material-ui/core';
import React, { useState, ChangeEvent } from 'react'

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
   }
   
  export const EditableSpan = React.memo ( (props: EditableSpanPropsType ) => {

        console.log('editablespan called')

        let [editMode, setEditMode] = useState(false)
        let [title, setTitle] = useState('')

        const activatedEditMode = () => {
            setEditMode(true);
            setTitle(props.title)

        };
        const activatedViewMode = () => {
            setEditMode(false);
            props.onChange(title)
        
        };
        const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)



       return editMode 
       ? <TextField variant='outlined' onChange={onChangeTitleHandler} autoFocus onBlur={activatedViewMode} value={title} />
       : <span  onDoubleClick={activatedEditMode} >{props.title}</span>

   })
   