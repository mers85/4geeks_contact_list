import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Alert } from "../component/alert.js";
import { Loading } from "../component/loading.js";

export const Contacts = () => {
	const { store } = useContext(Context);
	const [state, setState] = useState({
		showModal: false,
		id: "",
		fullName: ""
	});

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				{store.errors ? <Alert message={store.errors} isSuccess={true} /> : ""}
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					{store.isPending ? (
						<Loading />
					) : (
						<ul className="list-group pull-down mb-5" id="contact-list">
							{store.contacts.length > 0 ? (
								store.contacts.map(contact => {
									return (
										<ContactCard
											key={contact.id}
											id={contact.id}
											fullName={contact.full_name}
											email={contact.email}
											phone={contact.phone}
											address={contact.address}
											onDelete={() =>
												setState({
													showModal: true,
													id: contact.id,
													fullName: contact.full_name
												})
											}
										/>
									);
								})
							) : (
								<div className="pt-5 my-5 text-center text-muted display-4 font-italic">
									This agenda has no contacts
								</div>
							)}
						</ul>
					)}
				</div>
			</div>
			<Modal
				show={state.showModal}
				fullName={state.fullName}
				id={state.id}
				onClose={() => setState({ showModal: false })}
			/>
		</div>
	);
};
