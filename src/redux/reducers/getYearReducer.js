import {
    GET_YEAR_REQUEST,
    GET_YEAR_SUCCESS,
    GET_YEAR_FAILURE,
  } from "../types/getYearTypes";
  
  const initialState = {
    loading: false,
    years: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_YEAR_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case GET_YEAR_SUCCESS:
        return {
          loading: false,
          years: action.payload,
          error: "",
        };
      case GET_YEAR_FAILURE:
        return {
          loading: false,
          years: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;