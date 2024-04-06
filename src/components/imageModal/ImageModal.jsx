import { useState } from "react";
import Modal from "react-modal";

const ImageModal = ({ imageUrl, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
    onClose();
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <img src={imageUrl} alt="modal" />
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

export default ImageModal;
