import * as actionTypes from './actionTypes';
import reduce from '../reduce';

const initialState = {
    dialogOpen: false
}

const openDialog = (state) => {
    return {
        ...state,
        dialogOpen: true
    }
}

const closeDialog = (state)=>{
    return {
        ...state,
        dialogOpen: false
    }
}

export default reduce(initialState,{
    [actionTypes.DIALOG_SESSION_OPEN]: openDialog,
    [actionTypes.DIALOG_SESSION_CLOSE]: closeDialog
});