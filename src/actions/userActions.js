import * as userActionTypes from "../constants/userActionTypes";

export const addUser = (text) => ({
    type: userActionTypes.ADD_USER,
    id: nextTodoId++,
    text
  })
  
  export const fetchUsers = () => ({
    type: userActionTypes.FETCHE_USERS,
    filter
  })
  
  export const updateUser = (id, name, age) => ({
    type: userActionTypes.UPDATE_USER,
    id
  })

  export const deleteUser = (id) => ({
    type: userActionTypes.DELETE_USER,
    id
  })
