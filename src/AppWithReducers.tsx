import React, { useReducer, useState } from "react";
import "./App.css";
import Todolist, { TaskType } from "./Todolist";
import { v1 } from "uuid";
import {AddItemForm} from "./AddItemForm";
import { AppBar, Button,Container,Grid,IconButton,Paper,Toolbar, Typography} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistReducer } from "./state/todolist-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitlesAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TasksStateType = { [key: string]: Array<TaskType>;};
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};


function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();



  
  let [todolists, dispatchToTodolists] = useReducer(todolistReducer,[
    { id: todolistId1, title: "what to learn", filter: "active" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ]);
  
  let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    [todolistId1]: [
      { id: v1(), title: "GraphQL", isDone: false },
      { id: v1(), title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React book", isDone: false },
    ],
  });






  let removeTodolist = (todolistId: string) => {
    const action = RemoveTodolistAC(todolistId);
    dispatchToTodolists(action);
  };

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const action = ChangeTodolistTitleAC(todolistId, newTitle);
    dispatchToTodolists(action);
  }

  function changeFilter(filter: FilterValuesType, id: string) {
   let action = ChangeTodolistFilterAC(filter, id);
   dispatchToTodolists(action);
  }

  function addTask(title: string, todolistId: string) {
   let action = addTaskAC({ 
      isDone: true,
      description: 'string',
      title: 'string',
      completed: true,
      status: 0,
      priority: 0,
      startDate: "",
      deadline: "",
      id: "exists",
      todoListId: todolistId,
      order: 0,
      addedDate: ""
   });
   dispatchToTasks(action);
  }

  function removeTask(id: string, todolistId: string) {
    let action = removeTaskAC(id, todolistId);
    dispatchToTasks(action);
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    let action = changeTaskStatusAC(id, isDone, todolistId);
    dispatchToTasks(action);
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let action = changeTaskTitlesAC(id, newTitle, todolistId);
    dispatchToTasks(action);
  }

  function addTodolist(title: string) {
    const action = AddTodolistAC(title);
    dispatchToTasks(action);
    dispatchToTodolists(action);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === "active") {
              tasksForTodolist = allTodolistTasks.filter(
                (t) => t.isDone === false
              );
            }

            if (tl.filter === "completed") {
              tasksForTodolist = allTodolistTasks.filter(
                (t) => t.isDone === true
              );
            }

            return <Grid item>
              <Paper style={{padding: '10px'}}>
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
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
              />
              </Paper>
              </Grid>
          })}; 
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
