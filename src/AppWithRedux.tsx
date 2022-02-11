import React, { useCallback, useEffect, useReducer, useState } from "react";
import "./App.css";
import Todolist, { TaskType } from "./Todolist";
import { v1 } from "uuid";
import {AddItemForm} from "./AddItemForm";
import { AppBar, Button,Container,Grid,IconButton,Paper,Toolbar, Typography, LinearProgress} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { AddTodolistAC, addTodolistTC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, ChangeTodolistTitleTC, fetchTodolistsTC, RemoveTodolistAC, removeTodolistTC, setTodolistsAC } from "./state/todolist-reducer";
import { addTaskAC, addTaskTC, changeTaskStatusAC, changeTaskTitlesAC, changeTaskTitlesTC, removeTaskAC, removeTaskTC} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { todolistsAPI } from "./api/todolists-api";
import { AxiosResponse } from "axios";
import { RequestStatusType } from "./app-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TasksStateType = { [key: string]: Array<TaskType>};
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};


 export function AppWithRedux() {

  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch();

  useEffect( () => {
   dispatch(fetchTodolistsTC())
  }, [dispatch])

  

  const removeTodolist = useCallback ( (todolistId: string) => {
    const action = removeTodolistTC(todolistId);
    dispatch(action);
  }, [dispatch])

  const changeTodolistTitle = useCallback ( (todolistId: string, newTitle: string) => {
    const action = ChangeTodolistTitleTC(todolistId, newTitle);
    dispatch(action);
  }, [dispatch])

  const changeFilter = useCallback ( (filter: FilterValuesType, id: string) => {
   let action = ChangeTodolistFilterAC(filter, id);
   dispatch(action);
  }, [dispatch])

  const addTask = useCallback ( (title: string, todolistId: string) => {
   const thunk = addTaskTC(title, todolistId);
   dispatch(thunk);
  }, [dispatch])

  const removeTask = useCallback ( function(id: string, todolistId: string) {
   const thunk = removeTaskTC(id, todolistId)
   dispatch(thunk)
  }, [dispatch])

  const changeStatus = useCallback ( (id: string, isDone: boolean, todolistId: string) => {
    let action = changeTaskStatusAC(id, isDone, todolistId);
    dispatch(action);
  },[dispatch])

  const changeTaskTitle = useCallback ( (id: string, newTitle: string, todolistId: string) => {
    let action = changeTaskTitlesTC(id, newTitle, todolistId);
    dispatch(action);
  }, [dispatch])

  const addTodolist = useCallback ( (title: string) => {
    let action = addTodolistTC(title);
    dispatch(action);
  }, [dispatch]);

  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

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
      {status === 'loading' && <LinearProgress color="secondary"/>}
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3} key="tl">
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

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
