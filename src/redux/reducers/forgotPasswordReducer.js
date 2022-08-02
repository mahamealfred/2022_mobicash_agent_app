import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
  } from "../types/forgotPasswordTypes";
  
  const initialState = {
    loading: false,
    users: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case FORGOT_PASSWORD_SUCCESS:
        return {
          loading: false,
          users: action.payload,
          error: "",
        };
      case FORGOT_PASSWORD_FAILURE:
        return {
          loading: false,
          users: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;