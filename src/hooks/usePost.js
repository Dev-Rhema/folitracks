import { toast } from "react-toastify";

const usePost = (mutationHook) => {
  const [trigger, { data, error, isLoading }] = mutationHook();

  const postData = async (body, successMessage = "Operation successful!") => {
    try {
      const result = await trigger(body).unwrap();
      
      if (result) {
        toast.success(result?.message || successMessage);
      }
      return result;
    } catch (err) {
      const message = err?.data?.message;
      if (Array.isArray(message)) {
        message.forEach((msg) => toast.error(msg));
      } else {
        toast.error(message || "Operation failed. Please try again.");
      }
      throw err;
    }
  };

  return {
    postData,
    data,
    error,
    isLoading, 
  };
};

export default usePost;
