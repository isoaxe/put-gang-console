import { useState } from "react";
import Modal from "react-modal";
import { Box, styled } from "@mui/system";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { H2 } from "app/components/Typography";
import { addMonth, createFreeUser } from "app/utils/helpers";
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
  const [membLvl, setMembLvl] = useState("");
  const [expiry, setExpiry] = useState(oneMonthsTime);
  const [isLoading, setIsLoading] = useState(false);
  const { visible, setVisible } = props;
  const styles = {
    header: { marginBottom: "1rem", marginTop: "0.5rem" },
    text: { width: "250px", marginBottom: "1rem" },
    select: { textAlign: "left" },
    button: { marginBottom: "1rem" },
  };

  function close() {
    setVisible(false);
  }

  async function runFreeUserFn() {
    createFreeUser(membLvl, email, password, expiry, true);
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
          <FormControl>
            <InputLabel id="membership-select">Membership Level</InputLabel>
            <Select
              sx={{ ...styles.text, ...styles.select }}
              labelId="membership-select"
              label="Membership Level"
              value={membLvl}
              onChange={(event) => setMembLvl(event.target.value)}
            >
              <MenuItem value="watch">Watch the Discussion</MenuItem>
              <MenuItem value="join">Join the Discussion</MenuItem>
            </Select>
          </FormControl>
          <DateTimePicker
            value={expiry}
            label="Expiry Date"
            minutesStep={5}
            minDate={oneMonthsTime}
            onChange={(date) => setExpiry(date)}
            renderInput={(params) => <TextField sx={styles.text} {...params} />}
          />
          {isLoading ? (
            <CircularProgress style={styles.button} />
          ) : (
            <Button
              sx={styles.button}
              variant="outlined"
              onClick={() => runFreeUserFn()}
            >
              Create User
            </Button>
          )}
        </FlexBox>
      </LocalizationProvider>
    </Modal>
  );
}

export default AddUserModal;
