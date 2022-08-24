import {
    CLIENT_DETAILS_REQUEST,
    CLIENT_DETAILS_SUCCESS,
    CLIENT_DETAILS_FAILURE,
  } from "../types/getClientDetailsTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CLIENT_DETAILS_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case CLIENT_DETAILS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case CLIENT_DETAILS_FAILURE:
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