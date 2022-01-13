import React, { useState } from "react";
import "./App.css";
import Todolist, { TaskType } from "./Todolist";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TasksStateType = {
  [key: string]: Array<TaskType>
}

type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1,title: "what to learn", filter: "active"},
    {id: todolistId2, title: "what to buy", filter: "all"},
  ]);

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);
  }

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "GraphQL", isDone: false },
      { id: v1(), title: "JS", isDone: true }
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React book", isDone: false }
    ],
  })

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
    
  }

  function addTask(title: string, todolistId:string) {
    let task = { id: v1(), title: title, isDone: false };
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks];
    setTasks({...tasks});
  }

  function removeTask(id: string, todolistId:string) {
    let todolistTasks = tasks[todolistId]
    tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
    setTasks({...tasks});
  }

  function changeStatus(id: string, isDone: boolean, todolistId:string) {
    let todolistTasks = tasks[todolistId]
    let task = todolistTasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasks});
    }
  }

  function addTodolist (title:string) {
    let newTodolistId = v1();
    let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
    setTodolists([newTodolist, ...todolists]);
    setTasks({
      ...tasks,
      [newTodolistId]: []
    })
  }
  


  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {
      todolists.map( tl => {
        let allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks
       

        
        if (tl.filter === "active") {
          tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
        }

        if (tl.filter === "completed") {
          tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            addTask={addTask}
            changeFilter={changeFilter}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
 }

export default App;
