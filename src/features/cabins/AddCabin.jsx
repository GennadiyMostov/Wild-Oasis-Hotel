import { useState } from 'react';

import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

const AddCabin = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setShowModal(!showModal)}>
        {showModal ? 'Cancel' : 'Add New Cabin'}
      </Button>
      {showModal && (
        <Modal onCloseModal={() => setShowModal(false)}>
          <CreateCabinForm onCloseModal={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default AddCabin;
