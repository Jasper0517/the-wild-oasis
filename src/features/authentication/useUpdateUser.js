import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateCurrentUser({ fullName, avatar, password }),
    onSuccess: () => {
      toast.success("User SuccessFully Updated");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("Update User Error");
    },
  });

  return {
    updateUser,
    isUpdating,
  };
};
