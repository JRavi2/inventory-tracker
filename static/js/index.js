const itemList = document.getElementById("item-list");
const addEditModal = document.getElementById("add-edit-modal");
const span = document.getElementsByClassName("close")[0];
const addEditForm = document.getElementById("add-edit-form");
const addBtn = document.getElementById("add-btn");

const nameField = document.getElementById("inp-name");
const descField = document.getElementById("inp-desc");
const priceField = document.getElementById("inp-price");
const unitsField = document.getElementById("inp-units");
const sellerField = document.getElementById("inp-seller");
const idField = document.getElementById("inp-id");

let globalItemList = [];
let isAdd = true;

const createItemDiv = item => {
	return `<h3>${item.name}</h3>
		<p>${item.description}</p>
		<p>Price: ${item.price}</p>
		<p>Units: ${item.units}</p>`
}

// Close the modal
span.onclick = () => {
	addEditModal.style.display = "none";
}

addBtn.onclick = () => {
	addEditModal.style.display = "block";
	isAdd = true;
}

const editItem = e => {
	addEditModal.style.display = "block";
	isAdd = false;
	const item = globalItemList.find(it => it._id === e.target.parentNode.id);
	nameField.value = item.name;
	descField.value = item.description;
	priceField.value = item.price;
	unitsField.value = item.units;
	sellerField.value = item.seller;
	idField.value = item._id;
	console.log(e.target.parentNode.id);
}

const deleteItem = e => {
	var requestOptions = {
		method: 'DELETE',
		redirect: 'follow'
	};

	fetch(`/items/${e.target.parentNode.id}`, requestOptions)
		.then(response => response.text())
		.then(result => {
			console.log(result)
			fetchItems();
		})
		.catch(error => console.log('error', error));
}

const fetchItems = () => {
	fetch("/items")
		.then(async res => {
			const items = await res.json();
			itemList.innerHTML = "";
			globalItemList = items;
			items.forEach(item => {
				const itemDiv = document.createElement("div");
				itemDiv.setAttribute("class", "item");
				itemDiv.setAttribute("id", item._id);
				itemDiv.innerHTML = createItemDiv(item);

				const editBtn = document.createElement("a");
				const deleteBtn = document.createElement("a");
				editBtn.setAttribute("href", "#");
				editBtn.innerHTML = "Edit";
				editBtn.onclick = editItem;
				deleteBtn.setAttribute("href", "#");
				deleteBtn.innerHTML = "Delete";
				deleteBtn.onclick = deleteItem;

				itemDiv.appendChild(editBtn);
				itemDiv.appendChild(deleteBtn);
				itemList.appendChild(itemDiv);
			});
		})
		.catch(e => {
			console.log(e);
		});
}

const submitForm = e => {
	e.preventDefault();
	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let raw = JSON.stringify({
		"name": nameField.value,
		"description": descField.value,
		"units": unitsField.value,
		"price": priceField.value,
		"seller": sellerField.value
	});

	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	// Create
	if (isAdd) {
		fetch("/items", requestOptions)
			.then(response => response.text())
			.then(result => {
				console.log(result)
				fetchItems();
				addEditModal.style.display = "none";
			})
			.catch(error => console.log("error", error));
		requestOptions.method = "PATCH";
	} else {
		// Edit
		requestOptions.method = "PATCH";
		fetch("/items/" + idField.value, requestOptions)
			.then(response => response.text())
			.then(result => {
				console.log(result)
				fetchItems();
				addEditModal.style.display = "none";
			})
			.catch(error => console.log("error", error));
	}

}

addEditForm.addEventListener("submit", submitForm);

fetchItems();
