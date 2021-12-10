import React from 'react';

type TaskType = {
    title: string
    id: number
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
}


function Todolist(props: PropsType) {
    return (
         <div>
                <h3>{props.title}</h3>
                <div>
                    <input type="date" />
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                    <li><input type="checkbox" checked={false}/> <span>React</span></li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    )
}

export default Todolist