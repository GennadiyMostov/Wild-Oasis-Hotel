import supabase from './supabase';

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
  const { data, error } = await supabase
    .from('cabins')
    .insert([cabin])
    .select();

  if (error) {
    console.error(error);
  }

  return data;
};

export { getCabins, deleteCabin, createCabin };
