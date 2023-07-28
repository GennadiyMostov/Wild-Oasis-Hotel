import supabase, { supabaseUrl } from './supabase';

const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins Could Not Be Loaded');
  }

  return data;
};

const deleteCabin = async (id) => {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins Could Not Be Deleted');
  }
};

const createCabin = async (cabin) => {
  const imageName = `${Math.random()}-${cabin.image.name}`.replace('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //Create Cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...cabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
  }
  //Upload Image

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, cabin.image);

  //Delete cabin if there is error uploading Image

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('Cabin Image Upload Failed');
  }

  return data;
};

export { getCabins, deleteCabin, createCabin };
