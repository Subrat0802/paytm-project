import { toast } from "sonner";
import { authEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {SIGNUP_API, SIGNIN_API, GET_USER} = authEndpoint;

export const signup = async (firstName, lastName, email, phoneNumber, password) => {
  try {
    const response = await apiConnector("POST", SIGNUP_API, {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    if (response.message === "User signed up successfully") {
      toast.success(response.message);
      return true;
    } else {
      toast.error("Something went wrong while signup");
      return false;
    }
  } catch (error) {
    console.log("Signup Error", error);
    const err = error.response?.data;

    if (Array.isArray(err?.errors)) {
      err.errors.forEach((e) => toast.error(e.message));
    } else {
      toast.error(err?.message || "Something went wrong");
    }
  }
};

export const signin = async (email, password) => {
  try {
    const response = await apiConnector("POST", SIGNIN_API, { email, password });
    console.log("SIGNIN RESPONSE", response);
    if(response.message === "User signin successfully"){
        toast.success(response.message)
        return true
    }else{
        return false
    }
  } catch (error) {
    console.log("Signin Error", error);
    const err = error.response?.data;

    if (Array.isArray(err?.errors)) {
      err.errors.forEach((e) => toast.error(e.message));
    } else {
      toast.error(err?.message || "Something went wrong");
    }
  }
};


export const getUser = async () => {
    try{
        const response = await apiConnector("GET", GET_USER);
        console.log("GET_USER",response)
        return response;
    }catch(error){
        console.log("GET_USER error", error);
    }
}