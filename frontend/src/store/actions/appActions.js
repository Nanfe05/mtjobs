import * as actionTypes from '../actionTypes';

export const ChangeName=(name)=>({
    type: actionTypes.CHANGE_NAME,
    payload:name
});

export const SwitchLoading = () =>({
    type: actionTypes.SWITCH_LOADING
});

export const ChangeJob = (obj)=>({
    type: actionTypes.CHANGE_JOB,
    payload:obj
});

export const ChangeJobData = (obj) =>({
    type: actionTypes.JOB_DATA,
    payload: obj
});

export const ChangeNameData = (obj) =>({
    type: actionTypes.NAME_DATA,
    payload: obj
});