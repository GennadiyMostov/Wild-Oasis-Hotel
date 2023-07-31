import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin Created Seuccessfully');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => {
      toast.error(`Failed To Create Cabin: ${err.message}`);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
  };

  // const onError = (errors) => {
  // console.log(errors);
  // };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', { required: 'This Field Is Required' })}
        />
      </FormRow>

      <FormRow label='Max Capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'This Field Is Required',
            min: { value: 1, message: 'Capacity Must Be At Least 1' },
          })}
        />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'This Field Is Required',
            min: { value: 1, message: 'Capacity Must Be At Least 1' },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'This Field Is Required',
            validate: (value) => {
              if (value === '0') return;
              return (
                Number(value) <= Number(getValues().regularPrice) ||
                'Discount Must Be Less Than Regular Price'
              );
            },
          })}
        />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isCreating}
          defaultValue=''
          {...register('description')}
        />
      </FormRow>

      <FormRow label='Image' error={errors?.image?.mesage}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', { required: true })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Submit</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
