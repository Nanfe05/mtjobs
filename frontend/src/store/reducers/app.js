import * as actionTypes from '../actionTypes';

const defState = {
    name:'',
    job:'',
    nameData:{},
    jobData:{},
    loading:true,
    serverError:'',

};

const App = (state = defState, action) => {
  switch (action.type) {
    case actionTypes.SWITCH_LOADING:
        return{
            ...state,
            loading: !state.loading
        }
    case actionTypes.JOB_DATA:
        return{
            ...state,
            jobData: action.payload
        }
    case actionTypes.NAME_DATA:
        return{
            ...state,
            nameData: action.payload
        }
    case actionTypes.CHANGE_NAME:
      return {
        ...state,
        name:action.payload
        };
    case actionTypes.CHANGE_JOB:
        return {
            ...state,
            job:action.payload
            };
    default:
      return state;
  }
};

export default App;