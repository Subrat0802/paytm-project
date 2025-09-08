// import { toast } from "sonner";
import { transactionEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const {GET_USER} = transactionEndpoint;

export const getUserBySearch = async (searchUser) => {
  try {
    const response = await apiConnector("GET", `${GET_USER}?searchUser=${searchUser}`);
    return response;
  } catch (error) {
    console.log("RESPONSE GETUSER error", error);
  }
};
