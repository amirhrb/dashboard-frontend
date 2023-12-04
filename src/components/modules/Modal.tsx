"use client";

// components
import { Button, Modal } from "react-bootstrap";

function ModalComponent({
  title,
  body,
  dismissText,
  confirmText,
  show,
  handleClose,
  confirmFn,
}: {
  title: string;
  body: string;
  dismissText: string;
  confirmText: string;
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
  confirmFn: () => any | void;
}) {
  const handleFn = () => {
    confirmFn();
    handleClose();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            {dismissText}
          </Button>
          <Button variant="danger" onClick={handleFn}>
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
