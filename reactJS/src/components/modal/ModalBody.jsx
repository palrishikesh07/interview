import React, { useState } from "react";
import Modal from "./Modal";

const ModalBody = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container">
      <h1>Portal Modal Example</h1>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Hello </h2>
        <p>This is render using react Portal</p>
      </Modal>
    </div>
  );
};

export default ModalBody;
