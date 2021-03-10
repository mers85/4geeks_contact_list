const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: [],
			isPending: true
		},
		actions: {
			//(Arrow) Functions that update the Store
			getContactsForAgenda: agendaUrl => {
				fetch(agendaUrl, {
					method: "GET"
				})
					.then(response => {
						if (response.ok) {
							return response.json();
						}
					})
					.then(data => {
						if (data) {
							setStore({ contacts: data });
							setStore({ isPending: false });
						}
					})
					.catch(err => {
						console.log(err.message);
						setStore({ isPending: false });
					});
			},
			createContactInAgenda: (baseUrl, body) => {
				let bodyJSON = JSON.stringify(body);
				fetch(baseUrl, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: bodyJSON
				})
					.then(response => {
						if (response.ok) {
							return response.json();
						}
					})
					.then(data => {
						if (data) {
							let oldContacts = [...getStore().contacts];
							let newContacts = [...oldContacts, data];
							setStore({ contacts: newContacts });
						}
					})
					.catch(err => console.error(err));
			},
			getContact: url => {
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
							return data;
						}
					})
					.catch(err => console.error(err));
			},
			editContact: (baseUrl, id, body) => {
				let bodyJSON = JSON.stringify(body);
				fetch(baseUrl + id, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: bodyJSON
				})
					.then(response => {
						if (response.ok) {
							return response.json();
						}
					})
					.then(data => {
						if (data) {
							let oldContacts = [...getStore().contacts];
							let modifiedContact = data;

							let contactToModifiedIndex = oldContacts.findIndex(contact => contact.id === id);
							if (contactToModifiedIndex > -1) {
								oldContacts[contactToModifiedIndex] = modifiedContact;
							}

							setStore({ contacts: oldContacts });
						}
					})
					.catch(err => console.error(err));
			},
			deleteContact: (baseUrl, id) => {
				fetch(baseUrl + id, {
					method: "DELETE",
					headers: {
						"Content-type": "application/json"
					}
				})
					.then(response => {
						if (response.ok) {
							let oldContacts = [...getStore().contacts];

							let positionToDelete = oldContacts.findIndex(contact => {
								if (contact.id === id) {
									return true;
								}
							});

							oldContacts.splice(positionToDelete, 1);

							setStore({ contacts: oldContacts });
						} else {
							console.log("Something went wrong, error : ", response.status);
						}
					})
					.catch(err => console.error(err));
			}

			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
