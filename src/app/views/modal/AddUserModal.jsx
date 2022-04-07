import { useState } from "react";
import Modal from "react-modal";
import { Box, styled } from "@mui/system";
import { TextField } from "@mui/material";
import { H2 } from "app/components/Typography";
import "./css/shared.css";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

function AddUserModal(props) {
  Modal.setAppElement("#root");
  const [email, setEmail] = useState("");
  const { visible, setVisible } = props;
  const styles = {
    text: { width: "250px", marginBottom: "1rem" },
    button: { width: "100px" },
  };

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
        <FlexBox>
          <TextField
            sx={styles.text}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FlexBox>
      </div>
    </Modal>
  );
}

export default AddUserModal;
