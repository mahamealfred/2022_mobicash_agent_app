import {
  CASHIN_REQUEST,
  CASHIN_SUCCESS,
  CASHIN_FAILURE,
  } from "../types/cashInTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CASHIN_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case CASHIN_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case CASHIN_FAILURE:
        return {
          loading: false,
          details: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;