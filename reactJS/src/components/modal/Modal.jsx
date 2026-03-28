import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return createPortal(
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeStyle} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("root-modal"),
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
  position: "relative",
};

const closeStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
};

export default Modal;
