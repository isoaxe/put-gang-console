import { useState } from "react";
import Modal from "react-modal";
import { Box, styled } from "@mui/system";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { H2 } from "app/components/Typography";
import { addMonth } from "app/utils/helpers";
import "./css/shared.css";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

function AddUserModal(props) {
  Modal.setAppElement("#root");
  const now = new Date();
  const oneMonthsTime = addMonth(now);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState(oneMonthsTime);
  const { visible, setVisible } = props;
  const styles = {
    header: { marginBottom: "1rem", marginTop: "0.5rem" },
    text: { width: "250px", marginBottom: "1rem" },
    button: { marginBottom: "1rem" },
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
      <LocalizationProvider dateAdapter={DateAdapter}>
        <H2 style={styles.header}>Add Free User</H2>
        <FlexBox>
          <TextField
            sx={styles.text}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={styles.text}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <DateTimePicker
            value={expiry}
            label="Expiry Date"
            minutesStep={5}
            minDate={oneMonthsTime}
            onChange={(date) => setExpiry(date)}
            renderInput={(params) => <TextField sx={styles.text} {...params} />}
          />
          <Button sx={styles.button} variant="outlined" onClick={() => null}>
            Create User
          </Button>
        </FlexBox>
      </LocalizationProvider>
    </Modal>
  );
}

export default AddUserModal;
