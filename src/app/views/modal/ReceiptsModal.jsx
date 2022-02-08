import Modal from "react-modal";
import { H2, H3 } from 'app/components/Typography';
import ReceiptsListView from "./../list/ReceiptsListView";
import "./ReceiptsModal.css";


function ReceiptsModal (props) {
	Modal.setAppElement("#root");
	const { name, email } = props.selectedUser;

	function close () {
		props.setVisible(false);
	}

	function totalSpent () {
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
				<H3>{name || email}</H3>
				<H3>Total spent: ${totalSpent()}</H3>
				<ReceiptsListView receipts={props.receipts} />
			</div>
		</Modal>
	);
}


export default ReceiptsModal;
