import React, { useState } from 'react'

type EditableSpanPropsType = {
    title: string
   }
   
  export function EditableSpan(props: EditableSpanPropsType ) {

        let [editMode, setEditMode] = useState(false)

        const activatedEditMode = () => {setEditMode(true)};
        const activatedViewMode = () => {setEditMode(false)};

       return editMode 
       ? <input autoFocus onBlur={activatedViewMode} value={props.title} />
       : <span  onDoubleClick={activatedEditMode} >{props.title}</span>

   }
   