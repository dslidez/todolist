import React, { useState } from "react";
import "./App.css";
import Todolist, { TaskType } from "./Todolist";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";
import { AppBar, Button,Container,Grid,IconButton,Paper,Toolbar, Typography} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

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

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "what to learn", filter: "active" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ]);

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filteredTodolist);
  };

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "GraphQL", isDone: false },
      { id: v1(), title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React book", isDone: false },
    ],
  });

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks];
    setTasks({ ...tasks });
  }

  function removeTask(id: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = todolistTasks.filter((t) => t.id !== id);
    setTasks({ ...tasks });
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    //достаем нужный массив по todolistId
    let todolistTasks = tasks[todolistId];
    //найдем нужную таску
    let task = todolistTasks.find((t) => t.id === id);
    //изменим таску, если она нашлась
    if (task) {
      task.title = newTitle;
      //засетаем в стейт копию объекта, чтобы реакт отреагировал перерисовкой
      setTasks({ ...tasks });
    }
  }

  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistType = {
      id: newTodolistId,
      title: title,
      filter: "all",
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({
      ...tasks,
      [newTodolistId]: [],
    });
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
