import supabase from './supabase';

const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins Could Not Be Loaded');
  }

  return data;
};

export { getCabins };
