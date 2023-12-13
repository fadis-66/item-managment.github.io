//get Total
//creat Product
//save local storage
//clear inputs
//read
//count
//delete
//update
//search
//validations

const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");

let state = "create";
let temp;

price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);
//get Total
function getTotal() {
	if (price.value != "") {
		let result = +price.value + +taxes.value + +ads.value - +discount.value;
		total.innerHTML = result;
		total.style.background = "blue";
	} else {
		total.innerHTML = "";
		total.style.background = "#901919";
	}
}

//creat Product
submit.addEventListener("click", addProduct);
let dataProduct;
if (!!localStorage.products) {
	dataProduct = JSON.parse(localStorage.products);
} else {
	dataProduct = [];
}

function addProduct() {
	let newPro = {
		title: title.value.toLowerCase(),
		price: price.value,
		taxes: taxes.value,
		ads: ads.value,
		discount: discount.value,
		total: total.innerHTML,
		count: count.value,
		category: category.value.toLowerCase(),
	};

	if (state === "create") {
		if (newPro.count > 1) {
			for (let i = 0; i < newPro.count; i++) {
				dataProduct.push(newPro);
			}
		} else {
			dataProduct.push(newPro);
		}
	} else {
		dataProduct[temp] = newPro;
		state = "create";
		submit.innerHTML = "Create";
		count.style.display = "block";
	}

	localStorage.setItem("products", JSON.stringify(dataProduct));
	//  console.log(dataProduct);
	clearInputs();
	showData();
}

//clear inputs
function clearInputs() {
	title.value = "";
	price.value = "";
	taxes.value = "";
	ads.value = "";
	discount.value = "";
	total.innerHTML = "";
	count.value = "";
	category.value = "";
}

//read
function showData() {
	getTotal();
	let table = "";
	for (let i = 0; i < dataProduct.length; i++) {
		table += `
        <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;
	}

	document.getElementById("tbody").innerHTML = table;
	let btndAll = document.getElementById("deleteAll");

	if (dataProduct.length > 0) {
		btndAll.innerHTML = `<button onclick="deleteAll()">Delete All</button>`;
	} else {
		btndAll.innerHTML = "";
	}
}

showData();

//delete all
function deleteAll() {
	localStorage.clear();
	dataProduct.splice(0);
	showData();
}

//delete

function deleteData(i) {
	dataProduct.splice(i, 1);
	localStorage.products = JSON.stringify(dataProduct);

	showData();
}

// update
function updateData(i) {
	title.value = dataProduct[i].title;
	price.value = dataProduct[i].price;
	taxes.value = dataProduct[i].taxes;
	ads.value = dataProduct[i].ads;
	discount.value = dataProduct[i].discount;
	category.value = dataProduct[i].category;
	getTotal();
	count.style.display = "none";
	submit.innerHTML = "Update";
	state = "update";
	temp = i;
	scroll({
		top: 0,
		behavior: "smooth",
	});
}

//search

let searchMood = "title";

function getSearchMood(id) {
	let search = document.getElementById("search");
	if (id == "searchTitle") {
		searchMood = "title";
		search.placeholder = "Search by Title";
	} else {
		searchMood = "category";
		search.placeholder = "Search by Category";
	}
	search.focus();
	search.value = "";
	showData();
}

function searchData(value) {
	let table = "";
	if (searchMood == "title") {
		for (let i = 0; i < dataProduct.length; i++) {
			if (dataProduct[i].title.includes(value.toLowerCase())) {
				table += `
        <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;
			}
		}
	} else {
		for (let i = 0; i < dataProduct.length; i++) {
			if (dataProduct[i].category.includes(value.toLowerCase())) {
				table += `
        <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;
			}
		}
	}

	document.getElementById("tbody").innerHTML = table;
}
