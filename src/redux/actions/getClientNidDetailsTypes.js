import axios from "axios";
import {
    GET_CLIENT_NID_DETAILS_REQUEST,
    GET_CLIENT_NID_DETAILS_SUCCESS,
    GET_CLIENT_NID_DETAILS_FAILURE,
  } from "../types/getClientNidDetailsTypes";
  import { getClientEnrollmentAction } from "./clientEnrollmentAction";

export const getClientNidDetailsAction = (details,username,password,history) => async (dispatch) => {
  try {
    dispatch(getClientNidDetailsRequest());
   
    const  {clientNid}=details

    const {nidIssuePlace}=details
    const {nidBirthDate}=details
    const {activeEmail}=details
    const {activePhone}=details
   
    console.log('values:',clientNid)
   const Url='https://agentweb.mobicash.rw/api/agent/goverment-services/rnit/rest/v.4.14.01/identification-validation';
   const res = await axios.post(Url,{
    identification:clientNid,
  
   }, {
    // withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
  //'Authorization': + basicAuth,
 },
   });
   console.log("Had ",clientNid,nidBirthDate)
    const {data} = await res;
      if(res.data.responseCode===200){
        
        dispatch(getClientNidDetailsSuccess(data.Response));
        const nid=data.Response.nid.replaceAll(/\s/g, '')
        const dateOfbirth=data.Response.birthday
       // console.log("id and dateofbair",nid,dateOfbirth , clientNid,nidBirthDate)
        const birthday=new Date(nidBirthDate).toLocaleDateString()
       const dob=new Date(dateOfbirth).toLocaleDateString()
        if(clientNid===nid.replaceAll(/\s/g, '') && dob=== birthday){
          console.log('valide information')
          await dispatch(getClientEnrollmentAction(
            details,
            username,
            password,
            history
          ))
        }else{
          let errorMessage = ''
          errorMessage="The information provide does not match "
        await dispatch(getClientNidDetailsFailure(errorMessage));
        }
       // const 
      // history.push('/dashboard/cbhi-payment',{push:true})
      }else if(res.data.responseCode===400){
    
       await dispatch(getClientNidDetailsFailure("Invalid NID, Please provide valid NID"));
      }
    // history.push('/dashboard/cbhi-payment',{push:true})   
  } catch (err) {
    if (err.response) {
   let errorMessage = ''
       errorMessage="Invalid input"
       // errorMessage=await err.response.data.message
        dispatch(getClientNidDetailsFailure(errorMessage)); 
    } else {
      dispatch(getClientNidDetailsFailure("Network Error"));
    }
  }
};

export const getClientNidDetailsRequest = () => {
  return {
    type: GET_CLIENT_NID_DETAILS_REQUEST,
  };
};

export const getClientNidDetailsSuccess = (details) => {
  return {
    type: GET_CLIENT_NID_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getClientNidDetailsFailure = (error) => {
  return {
    type: GET_CLIENT_NID_DETAILS_FAILURE,
    payload: error,
  };
};