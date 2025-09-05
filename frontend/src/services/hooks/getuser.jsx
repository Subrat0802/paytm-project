import { useEffect, useState } from "react";
import { getUser } from "../operations/auth"

const useGetUser = () => {
    const [user, setUser] = useState(null);
    const getUserRes = async () => {
        try{
            const response = await getUser();
            console.log("getUser response", response)
            setUser(response.user);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getUserRes();
    }, [])

  return {user, getUserRes}
}

export default useGetUser