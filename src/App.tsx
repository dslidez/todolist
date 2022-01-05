import React, { useState } from "react";
import "./App.css";
import Todolist from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJs", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
    { id: v1(), title: "MongoDB", isDone: false },
    { id: v1(), title: "PostgresQL", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function addTask(title: string) {
    let task = { id: v1(), title: title, isDone: false };
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function changeStatus(id: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks([...tasks]);
    }
  }

  type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
  };

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {
      id: v1(),
      title: "what to learn",
      filter: "active",
    },
    {
      id: v1(),
      title: "what to buy",
      filter: "all",
    },
  ]);

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodolist = tasks;

        if (tl.filter === "active") {
          tasksForTodolist = tasks.filter((t) => t.isDone === false);
        }

        if (tl.filter === "completed") {
          tasksForTodolist = tasks.filter((t) => t.isDone === true);
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
          />
        );
      })}
    </div>
  );
}

export default App;
