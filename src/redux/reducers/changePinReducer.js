import {
    CHANGE_PIN_REQUEST,
    CHANGE_PIN_SUCCESS,
    CHANGE_PIN_FAILURE,
  } from "../types/changePinTypes";
  
  const initialState = {
    loading: false,
    users: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_PIN_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case CHANGE_PIN_SUCCESS:
        return {
          loading: false,
          users: action.payload,
          error: "",
        };
      case CHANGE_PIN_FAILURE:
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