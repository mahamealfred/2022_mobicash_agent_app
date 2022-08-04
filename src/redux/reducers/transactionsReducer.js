import {
    TRANSACTIONS_REQUEST,
    TRANSACTIONS_SUCCESS,
    TRANSACTIONS_FAILURE,
  } from "../types/transactionsTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case TRANSACTIONS_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case TRANSACTIONS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case TRANSACTIONS_FAILURE:
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