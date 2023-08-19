
export const ADD_STUDENT = "ADD_STUDENT";
export const GET_STUDENT = "GET_STUDENT";
export const EDIT_STUDENT = "EDIT_STUDENT";
export const DELETE_STUDENT = "DELETE_STUDENT"
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';
export const END_LOADING = 'END_LOADING';
export const START_LOADING = 'START_LOADING';

export const Logout = () => ({
  type: LOGOUT,

});

export const UserSignup = (payload)=>({
  type: AUTH,
  payload
})

export const UserLogin = (payload)=>({
  type: END_LOADING,
  payload
})

export const AddStudent = (payload) => ({
  type : ADD_STUDENT,
  payload
})

export const DeleteStudent = (payload) =>({
  type : DELETE_STUDENT,
  payload
})

export const EditStudent = (payload) =>({
  type: EDIT_STUDENT,
  payload
})

export const GetStudent = (payload) =>({
  type: GET_STUDENT,
  payload
})