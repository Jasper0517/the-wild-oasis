import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin SuccessFully Updated");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: () => {
      toast.error("Update Cabin Error");
    },
  });

  return {
    editCabin,
    isEditing,
  };
};
