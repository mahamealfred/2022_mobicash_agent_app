import {
    CLIENT_ENROLLMENT_REQUEST,
    CLIENT_ENROLLMENT_SUCCESS,
    CLIENT_ENROLLMENT_FAILURE,
  } from "../types/clientEnrollmentTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CLIENT_ENROLLMENT_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case CLIENT_ENROLLMENT_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case CLIENT_ENROLLMENT_FAILURE:
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