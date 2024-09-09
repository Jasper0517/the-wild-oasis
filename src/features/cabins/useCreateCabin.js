import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New Cabin SuccessFully Created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: () => {
      toast.error("Insert Cabin Error");
    },
  });

  return {
    createCabin,
    isCreating,
  };
};
