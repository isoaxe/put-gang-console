import Modal from "react-modal";
import { Avatar } from "@mui/material";
import { Box, styled } from "@mui/system";
import { H2, H3 } from "app/components/Typography";
import ReceiptsListView from "./../list/ReceiptsListView";
import "./css/shared.css";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

function ReceiptsModal(props) {
  Modal.setAppElement("#root");
  const { name, email, avatarUrl } = props.selectedUser;
  const avatarStyles = { width: "130px", height: "130px" };

  function close() {
    props.setVisible(false);
  }

  function totalSpent() {
    let total = 0;
    props.receipts.forEach((item) => {
      total += item.sale;
    });
    return total;
  }

  return (
    <Modal
      isOpen={props.visible}
      onRequestClose={close}
      contentLabel="Payment Receipts Modal"
      className="content"
      overlayClassName="overlay"
    >
      <div>
        <H2>Payment History</H2>
        <FlexBox>
          <Avatar sx={avatarStyles} src={avatarUrl}></Avatar>
        </FlexBox>
        <H3>{name || email}</H3>
        <H3>Total spent: ${totalSpent()}</H3>
        <ReceiptsListView receipts={props.receipts} />
      </div>
    </Modal>
  );
}

export default ReceiptsModal;
