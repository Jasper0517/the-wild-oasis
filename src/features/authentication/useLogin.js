import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginApi } from "../../services/apiAuth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success("Login in");
      queryClient.setQueryData(["user"], data.user);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log("error: ", error);
      toast.error("Login Error");
    },
  });

  return { login, isLoading };
};
