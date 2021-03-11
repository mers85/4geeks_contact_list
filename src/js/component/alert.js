import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Alert = props => {
	const [show, setShow] = useState(true);

	return (
		<div
			className="alert alert-success  alert-dismissible mt-5 fade show text-center"
			style={{ display: show ? "inline-block" : "none" }}
			role="alert">
			{" " + props.message + " "}
			<Link
				to="/"
				type="button"
				className="close"
				data-dismiss="alert"
				aria-label="Close"
				onClick={() => setShow(false)}>
				<span aria-hidden="true">&times;</span>
			</Link>
		</div>
	);
};

Alert.propTypes = {
	message: PropTypes.string,
	onClose: PropTypes.func
};
