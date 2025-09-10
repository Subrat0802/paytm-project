// import { toast } from "sonner";
import { transactionEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {GET_USER, PAY} = transactionEndpoint;

export const getUserBySearch = async (searchUser) => {
  try {
    const response = await apiConnector("GET", `${GET_USER}?searchUser=${searchUser}`);
    return response;
  } catch (error) {
    console.log("RESPONSE GETUSER error", error);
  }
};


export const pay = async (amount, transactionMsg, UserReceiver) => {
  try{
    const response = await apiConnector("POST", PAY, { amount, transactionMsg, UserReceiver });
    console.log("response pay", response);
  }catch(error){
    console.log("Error", error);
  }
}