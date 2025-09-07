import { useEffect, useState, useCallback } from "react";
import { getUser } from "../operations/auth";

const useGetUser = () => {
  const [user, setUser] = useState(null);

  // wrap in useCallback so the function reference doesn't change
  const refreshUser = useCallback(async () => {
    try {
      const response = await getUser();
      console.log("getUser response", response);
      setUser(response.user);
    } catch (error) {
      console.error(error);
    }
  }, []); // no deps → stable function

  useEffect(() => {
    refreshUser(); // fetch once on mount
  }, [refreshUser]);

  return { user, refreshUser };
};

export default useGetUser;
