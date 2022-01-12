const itemList = document.getElementById("item-list");

let globalItemList = [];

const createItemDiv = item => {
	return `<h3>${item.name}</h3>
		<p>${item.description}</p>
		<p>Price: ${item.price}</p>
		<p>Units: ${item.units}</p>`
}

const undeleteItem = e => {
	var requestOptions = {
		method: "POST",
		redirect: "follow"
	};

	fetch(`/items/undelete/${e.target.parentNode.id}`, requestOptions)
		.then(response => response.text())
		.then(result => {
			console.log(result)
			fetchItems();
		})
		.catch(error => console.log("error", error));
}

const deleteItem = e => {
	var requestOptions = {
		method: "DELETE",
		redirect: "follow"
	};

	fetch(`/items/${e.target.parentNode.id}`, requestOptions)
		.then(response => response.text())
		.then(result => {
			console.log(result)
			fetchItems();
		})
		.catch(error => console.log("error", error));
}

const fetchItems = () => {
	fetch("/items/deleted")
		.then(async res => {
			const items = await res.json();
			itemList.innerHTML = "";
			globalItemList = items;
			items.forEach(item => {
				const itemDiv = document.createElement("div");
				itemDiv.setAttribute("class", "item");
				itemDiv.setAttribute("id", item._id);
				itemDiv.innerHTML = createItemDiv(item);

				const deleteBtn = document.createElement("a");
				deleteBtn.setAttribute("href", "#");
				deleteBtn.innerHTML = "Delete Permanently";
				deleteBtn.onclick = deleteItem;

				const undeleteBtn = document.createElement("a");
				undeleteBtn.setAttribute("href", "#");
				undeleteBtn.innerHTML = "Undelete";
				undeleteBtn.onclick = undeleteItem;

				itemDiv.appendChild(deleteBtn);
				itemDiv.appendChild(undeleteBtn);
				itemList.appendChild(itemDiv);
			});
		})
		.catch(e => {
			console.log(e);
		});
}

fetchItems();
