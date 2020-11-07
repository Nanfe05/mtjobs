import * as actionTypes from '../actionTypes';



export const ChangeName=(name)=>({
    type: actionTypes.CHANGE_USER_NAME,
    payload:name
});


export const ChangeObjetive = (obj)=>({
    type: actionTypes.CHANGE_OBJECTIVE,
    payload:obj
});