import * as actionTypes from '../actionTypes';



export const ChangeName=(name)=>({
    type: actionTypes.CHANGE_USER_NAME,
    payload:name
});