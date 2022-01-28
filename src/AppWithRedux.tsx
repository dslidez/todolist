import React, { useReducer, useState } from "react";
import "./App.css";
import Todolist, { TaskType } from "./Todolist";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";
import { AppBar, Button,Container,Grid,IconButton,Paper,Toolbar, Typography} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC } from "./state/todolist-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitlesAC, removeTaskAC} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TasksStateType = { [key: string]: Array<TaskType>};
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};


function AppWithRedux() {

  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch();


  let removeTodolist = (todolistId: string) => {
    const action = RemoveTodolistAC(todolistId);
    dispatch(action);
  };

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const action = ChangeTodolistTitleAC(todolistId, newTitle);
    dispatch(action);
  }

  function changeFilter(filter: FilterValuesType, id: string) {
   let action = ChangeTodolistFilterAC(filter, id);
   dispatch(action);
  }

  function addTask(title: string, todolistId: string) {
   let action = addTaskAC(title, todolistId);
   dispatch(action);
  }

  function removeTask(id: string, todolistId: string) {
    let action = removeTaskAC(id, todolistId);
    dispatch(action);
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    let action = changeTaskStatusAC(id, isDone, todolistId);
    dispatch(action);
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let action = changeTaskTitlesAC(id, newTitle, todolistId);
    dispatch(action);
  }

  function addTodolist(title: string) {
    let action = AddTodolistAC(title);
    dispatch(action);
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
        <Grid container spacing={3} key="tl">
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

export default AppWithRedux;
