import supabase, { supabaseUrl } from "./supabase";

export const fetchCabins = async ({ filter, sortBy }) => {
  let query = supabase.from("cabins").select("*");

  if (filter) {
    if (filter.value === "no-discount") query = query.eq(filter.field, 0);
    else query = query.gt(filter.field, 0);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  const { data, error } = await query;

  if (error) throw new Error("Cabins could not be loaded");

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabins could not be deleted");

  return data;
};

export const createEditCabin = async (newCabin, id) => {
  console.log("newCabin?.image, id: ", newCabin?.image, id);
  const hasImagePath = typeof newCabin.image === "string";
  console.log("hasImagePath: ", hasImagePath);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://onyxpfcdywesztnpumtl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-08-17T23%3A28%3A59.018Z
  let query = supabase.from("cabins");

  // for create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // for edit

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) throw new Error("Cabins could not be inserted");

  if (!hasImagePath) {
    // 2
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);
    //
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error(
        "Cabins image could not be uploaded and the cabin was not created."
      );
    }
  }

  return data;
};

export const updateCabin = async (id, form) => {
  await supabase.from("cabins").update(form).eq("id", id).select();
};
