import { useEffect } from "react";
import { toast } from "react-toastify";

const useGet = (queryHook, args = null, options = {}) => {
  const { data, error, isLoading, isFetching, isUninitialized, isError, refetch } = queryHook(args, options);

  useEffect(() => {
    if (isError) {
      const message = error?.data?.message || error?.message;
      if (Array.isArray(message)) {
        message.forEach((msg) => toast.error(msg));
      } else {
        toast.error(message || "An error occurred while fetching data");
      }
    }
  }, [isError, error]);

  return {
    data: data?.data !== undefined ? data.data : data,
    error,
    loading: isLoading || isFetching || isUninitialized,
    refetch,
  };
};

export default useGet;
