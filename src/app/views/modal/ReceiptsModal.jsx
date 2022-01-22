import Modal from "react-modal";
import "./ReceiptsModal.css";


function ReceiptsModal (props) {
	Modal.setAppElement("#root");

	function close () {
		props.setVisible(false);
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
			</div>
		</Modal>
	);
}


export default ReceiptsModal;
