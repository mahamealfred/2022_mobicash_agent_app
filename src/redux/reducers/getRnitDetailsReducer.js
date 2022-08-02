import {
    GET_RNIT_DETAILS_REQUEST,
    GET_RNIT_DETAILS_SUCCESS,
    GET_RNIT_DETAILS_FAILURE,
  } from "../types/getRnitDetailsTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_RNIT_DETAILS_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_RNIT_DETAILS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case GET_RNIT_DETAILS_FAILURE:
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