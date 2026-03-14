import { useEffect } from "react";
import { toast } from "react-toastify";

const useGet = (queryHook, args = null, options = {}) => {
  const { data, error, isLoading, isFetching, isUninitialized, refetch } = queryHook(args, options);

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
    data: data?.data !== undefined ? data.data : data,
    error,
    loading: isLoading || isFetching || isUninitialized,
    refetch,
  };
};

export default useGet;
