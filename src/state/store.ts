import {tasksReducer} from './tasks-reducer';
import {todolistReducer} from './todolist-reducer';
import {combineReducers, createStore} from 'redux';


const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistReducer
})

export const store = createStore(rootReducer);

//automatic find type of approotstate
export type AppRootStateType = ReturnType<typeof rootReducer>

// console log store
// @ts-ignore
window.store = store;
