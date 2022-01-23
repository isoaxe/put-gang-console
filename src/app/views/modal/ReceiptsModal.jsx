import Modal from "react-modal";
import ReceiptsListView from "./../list/ReceiptsListView";
import "./ReceiptsModal.css";


function ReceiptsModal (props) {
	Modal.setAppElement("#root");

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
				<h2>Payment History</h2>
				<h3>Total spent: ${totalSpent()}</h3>
				<ReceiptsListView receipts={props.receipts} />
			</div>
		</Modal>
	);
}


export default ReceiptsModal;
