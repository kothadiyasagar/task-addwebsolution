import {
  ADD_STUDENT,
  EDIT_STUDENT,
  DELETE_STUDENT,
  GET_STUDENT,
  AUTH,
  LOGOUT,
  START_LOADING,
  END_LOADING
} from "./action";

const initState = {

  student: [],
  authData:{},
  loading:false,
  errors: null
};

export const studentReducer = (state = initState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    case ADD_STUDENT:
      return {
        ...state,

        student: [...state.student, action.payload]
      };
    case DELETE_STUDENT:
      return { ...state, student: state.student.filter((student) => student.id !== action.payload) };

    case EDIT_STUDENT:
      return { ...state, student: state.student.map((student) => (student.id === action.payload.id ? action.payload : student)) };

    case GET_STUDENT:
      return { ...state, student: action.payload };
    default:
      return state;
  }
};