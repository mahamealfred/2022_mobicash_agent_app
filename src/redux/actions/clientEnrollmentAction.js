import axios from "axios";
import {
    CLIENT_ENROLLMENT_REQUEST,
    CLIENT_ENROLLMENT_SUCCESS,
    CLIENT_ENROLLMENT_FAILURE,
  } from "../types/clientEnrollmentTypes";
  
export const getClientEnrollmentAction = (details,username,password,history) => async (dispatch) => {
  try {
    dispatch(getClientEnrollmentRequest());
    
    console.log("kkpoook",username,password)
  
   let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentweb.mobicash.rw/api/client/user/rest/v.4.14.01/enrollment';
   const res = await axios.post(Url,{
    names:"Tester client Level 2",
    username:"testerclientL2",
    email:"nyirurugo@gmail.com",
    nationality:"rwanda",
    identity_type:"national_id",
    identity_number:"1199111989090900",
    maritial_status:"married",
    gender:"male",
    date_of_birth:"1991-05-26",
    phoneNumber:"0784002519",
    province:"Kigali city",
    district:"Gasabo",
    sector:"Remera",
    city:"Kigali"
   },{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
    'Authorization': + basicAuth,
 },
  auth: {
    username,
    password
  }
   });
    const {data} = await res;
    console.log("datat",data)
      if(res.data.responseCode==200){
        dispatch(getClientEnrollmentSuccess("Account created Successfully"));
       // history.push('/dashboard/client-cashin',{push:true})
      }   
      if(res.data.responseCode==400){
        const errorMessage = "Invalid credentials";
        dispatch(getClientEnrollmentFailure(errorMessage));
      }
  } catch (err) {
    if (err.response) {
     // const errorMessage = await err.response.data.status;
       let errorMessage = ''
        errorMessage="Invalid Credentials"
     // const errorMessage = 'Transaction Faild '
       // errorMessage=await err.response.data.message
        dispatch(getClientEnrollmentFailure(errorMessage));
      
    } else {
      dispatch(getClientEnrollmentFailure("Network Error"));
    }
  }
};

export const getClientEnrollmentRequest = () => {
  return {
    type: CLIENT_ENROLLMENT_REQUEST,
  };
};

export const getClientEnrollmentSuccess = (details) => {
  return {
    type: CLIENT_ENROLLMENT_SUCCESS,
    payload: details,
  };
};
export const getClientEnrollmentFailure = (error) => {
  return {
    type: CLIENT_ENROLLMENT_FAILURE,
    payload: error,
  };
};