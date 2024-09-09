import { useQuery } from "@tanstack/react-query";
import { fetchCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export const useCabins = () => {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount");

  const filter =
    filterValue === "all" || !filterValue
      ? null
      : { field: "discount", value: filterValue };
  const sortByRaw = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin", filter, sortBy],
    queryFn: () => fetchCabins({ filter, sortBy }),
  });

  return {
    isLoading,
    cabins,
    error,
  };
};
