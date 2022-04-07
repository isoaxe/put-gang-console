import Modal from "react-modal";
import { Box, styled } from "@mui/system";
import { H2 } from "app/components/Typography";
import "./css/shared.css";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

function AddUserModal(props) {
  Modal.setAppElement("#root");
  const { visible, setVisible } = props;

  function close() {
    setVisible(false);
  }

  return (
    <Modal
      isOpen={visible}
      onRequestClose={close}
      contentLabel="Add Free User Modal"
      className="content"
      overlayClassName="overlay"
    >
      <div>
        <H2>Add Free User</H2>
        <FlexBox></FlexBox>
      </div>
    </Modal>
  );
}

export default AddUserModal;
