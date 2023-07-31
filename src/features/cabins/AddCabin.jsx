import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import CabinTable from './CabinTable';

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens='cabin-form'>
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens='table'>
        <Button>Show Cabin Table</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
};

/*  SAVED FOR REFERENCE */

// const AddCabin = () => {
//   const [showModal, setShowModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setShowModal(!showModal)}>
//         {showModal ? 'Cancel' : 'Add New Cabin'}
//       </Button>
//       {showModal && (
//         <Modal onCloseModal={() => setShowModal(false)}>
//           <CreateCabinForm onCloseModal={() => setShowModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddCabin;
