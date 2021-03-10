import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { BASE_URL } from "../component/helperConstants.js";

export const Modal = props => {
	const { actions } = useContext(Context);

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<p>Contacto a eliminar: {props.fullName}</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-primary"
							data-dismiss="modal"
							aria-label="Close"
							onClick={() => props.onClose()}>
							Oh no!
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
							onClick={() => {
								actions.deleteContact(BASE_URL, props.id);
								props.onClose();
							}}>
							Delete this contact!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	id: PropTypes.string,
	fullName: PropTypes.string
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};
