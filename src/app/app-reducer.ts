export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
   status: 'loading' as RequestStatusType,
   error: 'OMG! ERROR! 404 NOT FOUND FUTURE'
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
       case 'APP/SET-STATUS':
           return {...state, status: action.status};
       case 'APP/SET-ERROR':
           return {...state, error: action.error};
       default:
           return state
   }
}

type ActionsType = any

type setAppStatusActionType = {
    type: 'APP/SET-STATUS',
    status: RequestStatusType | null
}

type setAppErrorActionType = {
    type: 'APP/SET-ERROR',
    error: string | null
}

export const setAppStatusAC = (status: RequestStatusType | null): setAppStatusActionType => {
    return { type: 'APP/SET-STATUS', status}
}
export const setAppErrorAC = (error: string | null): setAppErrorActionType => {
    return { type: 'APP/SET-ERROR', error}
}