import { useForm } from 'react-hook-form';

import useCreateCabin from './useCreateCabin';
import useEditCabin from './useEditCabin';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';

function CreateEditCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    console.log(data);

    if (isEditSession) {
      editCabin(
        {
          cabinEditData: {
            ...data,
            image,
          },
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        }
      );
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: 'This Field Is Required' })}
        />
      </FormRow>

      <FormRow label='Max Capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          defaultValue=''
          {...register('description')}
        />
      </FormRow>

      <FormRow label='Image' error={errors?.image?.mesage}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'This Field Is Required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onCloseModal?.()}
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>Submit</Button>
      </FormRow>
    </Form>
  );
}

export default CreateEditCabinForm;
