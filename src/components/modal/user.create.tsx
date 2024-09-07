import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Modal from "react-bootstrap/Modal";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { createNewUser, resetCreate } from "../../redux/user/user.slice";

const UserCreateModal = (props: any) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const isCreateSuccess = useAppSelector((state) => state.user.isCreateSuccess);

  useEffect(() => {
    if (isCreateSuccess === true) {
      setIsOpenCreateModal(false);
      setEmail("");
      setName("");
      toast("🦄 Wow so easy! Create new User");
      // reset redux
      dispatch(resetCreate());
    }
  }, [isCreateSuccess]);

  const handleSubmit = () => {
    if (!email) {
      toast.error("Email is invalid");
      return;
    }
    if (!name) {
      toast.error("Name is invalid");
      return;
    }
    dispatch(createNewUser({ email, name })); // payload
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="container-modal-title-vcenter">
          Add a new User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={(event) => setEmail(event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Name">
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={props.onHide}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserCreateModal;
