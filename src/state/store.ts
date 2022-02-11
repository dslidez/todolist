import {tasksReducer} from './tasks-reducer';
import {todolistReducer} from './todolist-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from '../app-reducer';


const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistReducer,
   app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

//automatic find type of approotstate
export type AppRootStateType = ReturnType<typeof rootReducer>

//store
// console log store
// @ts-ignore
window.store = store;
