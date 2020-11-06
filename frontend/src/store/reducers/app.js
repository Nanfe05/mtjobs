const defState = {
    user_name:'',
    user_email:''
};

const App = (state = defState, action) => {
  switch (action.type) {
    case "CHANGE_USER_NAME":
      return {
        ...state,
        user_name:action.payload
        };
    default:
      return state;
  }
};

export default App;