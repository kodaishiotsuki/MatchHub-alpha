import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Divider, Modal } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";

export default function UnauthModal() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  function handleClose() {
    setOpen(false);
  }

  return (
    <Modal open={open} size='mini' onClose={handleClose}>
      <Modal.Header content='You need to be signed in to do that' />
      <Modal.Content>
        <p>Please either login or register to see this content</p>
        <Button.Group widths={4}>
          <Button
            fluid
            color='teal'
            content='Login'
            onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
          />
          <Button.Or />
          <Button
            fluid
            color='green'
            content='Register'
            onClick={() => dispatch(openModal({ modalType: "RegisterForm" }))}
          />
        </Button.Group>
        <Divider />
        <div style={{ textAlign: "center" }}>
          <p>Or Click cancel to continue as a guest</p>
          <Button onClick={handleClose} content='Cancel' />
        </div>
      </Modal.Content>
    </Modal>
  );
}
