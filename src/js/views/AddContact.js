import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert } from "../component/alert.js";

import { BASE_URL, SLUG, AGENDA_URL } from "../component/helperConstants.js";

export const AddContact = props => {
	const { actions } = useContext(Context);
	const [state, setState] = useState({ full_name: "", email: "", phone: "", address: "" });
	const [alertMessage, setAlertMessage] = useState("");

	let id = props.match.params.id;

	useEffect(() => {
		if (id !== undefined) {
			let url = BASE_URL + id;
			fetch(url, {
				method: "GET"
			})
				.then(response => {
					if (response.ok) {
						return response.json();
					}
				})
				.then(data => {
					if (data) {
						setState({
							...data
						});
					}
				})
				.catch(err => console.error(err));
		}
	}, []);

	function handleSubmit() {
		event.preventDefault();

		let body = {
			full_name: state.full_name,
			email: state.email,
			agenda_slug: SLUG,
			address: state.address,
			phone: state.phone
		};
		if (id == undefined) {
			actions.createContactInAgenda(BASE_URL, body);
			setAlertMessage("El contacto " + body.full_name + " se ha añadido a la agenda.");
		} else {
			actions.editContact(BASE_URL, props.match.params.id, body);
			setAlertMessage("El contacto " + body.full_name + " ha sido modificado.");
		}
	}

	function handleChange(event) {
		setState({ ...state, [event.target.name]: event.target.value });
	}

	return (
		<div className="container">
			{alertMessage ? <Alert message={alertMessage} /> : ""}
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form name="FormContact" onSubmit={() => handleSubmit()}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="full_name"
							value={state.full_name}
							onChange={event => handleChange(event)}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							name="email"
							value={state.email}
							onChange={event => handleChange(event)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter phone"
							name="phone"
							value={state.phone}
							onChange={event => handleChange(event)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							name="address"
							value={state.address}
							onChange={event => handleChange(event)}
						/>
					</div>
					<button type="submit" className="btn btn-info form-control">
						save
					</button>
					<Link
						className="mt-3 w-100 text-center btn btn-info btn-block "
						to="/"
						onClick={() => actions.getContactsForAgenda(AGENDA_URL)}>
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

AddContact.propTypes = {
	match: PropTypes.object
};
