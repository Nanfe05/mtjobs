import * as actionTypes from '../actionTypes';

const defState = {
    user_name:'',
    user_email:'',
    objective:''
};

const App = (state = defState, action) => {
  switch (action.type) {
    
    case actionTypes.CHANGE_USER_NAME:
      return {
        ...state,
        user_name:action.payload
        };
    case actionTypes.CHANGE_OBJECTIVE:
        return {
            ...state,
            objective:action.payload
            };
    default:
      return state;
  }
};

export default App;