import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

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
    mutate(data);
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name', { required: 'This Field Is Required' })}
        />
      </FormRow>

      <FormRow label='maxCapacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This Field Is Required',
            min: { value: 1, message: 'Capacity Must Be At Least 1' },
          })}
        />
      </FormRow>

      <FormRow label='regularPrice' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This Field Is Required',
            min: { value: 1, message: 'Capacity Must Be At Least 1' },
          })}
        />
      </FormRow>

      <FormRow label='discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This Field Is Required',
            validate: (value) => {
              return (
                value <= getValues().regularPrice ||
                'Discount Must Be Less Than Regular Price'
              );
            },
          })}
        />
      </FormRow>

      <FormRow label='description' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description')}
        />
      </FormRow>

      <FormRow label='image' error={errors?.image?.mesage}>
        <FileInput id='image' accept='image/*' />
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
