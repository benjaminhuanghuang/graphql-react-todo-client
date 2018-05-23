import * as userActionTypes from "../constants/userActionTypes";

const initialState = {
  users: []
};

const usersReducer = (state = [], action) => {
    switch (action.type) {
      case userActionTypes.ADD_USER:
        return { ...state, users: [...state.users, action.payload] };
      case userActionTypes.FETCHE_USERS:
        return state.map(todo =>
          (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }
  
  export default usersReducer;