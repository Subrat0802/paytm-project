import { authEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {SIGNUP_API, SIGNIN_API} = authEndpoint;

export const signup = async (firstName, lastName, email, phoneNumber, password) => {
    try{
        const response = await apiConnector("POST", SIGNUP_API, {firstName, lastName, email, phoneNumber, password});
        console.log("SIGNUP RESPONSE", response);
        return response;
    }catch(error){
        console.log("Signup Error", error);
    }
}


export const signin = async ({email, phoneNumber}) => {
    try{
        const response = await apiConnector("POST", SIGNIN_API, {email, phoneNumber});
        console.log("SIGNIN RESPONSE", response);
    }catch(error){
        console.log("Signin Error", error);
    }
}