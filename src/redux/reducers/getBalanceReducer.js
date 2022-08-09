import {
    GET_BALANCE_REQUEST,
    GET_BALANCE_SUCCESS,
    GET_BALANCE_FAILURE,
  } from "../types/getBalanceTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_BALANCE_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_BALANCE_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case GET_BALANCE_FAILURE:
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