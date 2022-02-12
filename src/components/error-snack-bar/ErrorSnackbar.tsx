import React, { Dispatch } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { appReducer, setAppErrorAC } from '../../app/app-reducer'
import { AppRootStateType } from '../../state/store'

function Alert(props: AlertProps) {
   return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
   const [open, setOpen] = React.useState(true)
   const error = useSelector<AppRootStateType, string | null>( state => state.app.error)
   const dispatch = useDispatch()

   const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
       if (reason === 'clickaway') {
           return 
       } 
       dispatch(setAppErrorAC(null))
       setOpen(false)
   }


   return (
       <Snackbar open={error !== null} autoHideDuration={4000} onClose={handleClose}>
           <Alert onClose={handleClose} severity="error">
            {error}
           </Alert>
       </Snackbar>
   )
}
