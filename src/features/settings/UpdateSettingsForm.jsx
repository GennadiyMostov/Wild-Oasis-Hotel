import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import useSettings from './useSettings';
import Spinner from '../../ui/Spinner';
import useUpdateSetting from './useUpdateSettings';

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestsPerBooking,
    minBookingLength,
  } = settings;

  if (isLoading) return <Spinner />;

  const handleUpdate = (event, field) => {
    const { value } = event.target;

    if (!value) return;

    updateSetting({ [field]: value });
  };

  return (
    <Form>
      <FormRow label='Minimum Nights/Booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(event) => handleUpdate(event, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum Nights/Booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label='Maximum Guests/Booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(event) => handleUpdate(event, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Breakfast Price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(event) => handleUpdate(event, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
