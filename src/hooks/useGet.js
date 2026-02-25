import { useEffect } from "react";
import { toast } from "react-toastify";

const useGet = (queryHook, args = null, options = {}) => {
  if (!queryHook) {
    throw new Error("queryHook is required for useGet");
  }

  const { data, error, isLoading, isFetching, refetch } = queryHook(args, options);

  useEffect(() => {
    if (error) {
      const message = error?.data?.message;
      if (Array.isArray(message)) {
        message.forEach((msg) => toast.error(msg));
      } else {
        toast.error(message || "An error occurred while fetching data");
      }
    }
  }, [error]);

  return {
    data: data?.data,
    error,
    loading: isLoading || isFetching,
    refetch,
  };
};

export default useGet;
