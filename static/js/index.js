const itemList = document.getElementById("item-list");
const addEditModal = document.getElementById("add-edit-modal");
const span = document.getElementsByClassName("close")[0];
const addEditForm = document.getElementById("add-edit-form");

let globalItemList = [];

const createItemDiv = item => {
	return `<h3>${item.name}</h3>
		<p>${item.description}</p>
		<p>Price: ${item.price}</p>
		<p>Units: ${item.units}</p>`
}

// Close the modal
span.onclick = function() {
  addEditModal.style.display = "none";
}

const editItem = e => {
	addEditModal.style.display = "block";
	console.log(e.target.parentNode.id);
}

const deleteItem = e => {
	console.log(e);
}

const fetchItems = () => {
	itemList.innerHTML = "";
	fetch("/items")
		.then(async res => {
			const items = await res.json();
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

fetchItems();
