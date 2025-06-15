import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useToast } from "../context/toast-context";

const fetchData = async (url, token, _, logout) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (error) {
    const errMessage = error.response?.data?.message || "Something went wrong";

    if (errMessage.toLowerCase() === "unauthenticated") logout();

    throw new Error(errMessage);
  }
};

const useGet = (url, queryKey) => {
  const { token, logout } = useAuth();
  const { showToast } = useToast();

  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchData(url, token, showToast, logout),
    onError: () => {
      showToast("An unexpected error occurred", "error");
    },
  });
};

export default useGet;
