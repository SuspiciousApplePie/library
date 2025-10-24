let myLibrary = [];

function Book(id, name, author, page, read) {
	// Book constructor will be used on creating books.
	this.id = id;
	this.name = name;
	this.author = author;
	this.page = page;
	this.read = read;
}

let object1 = new Book(1, 'Luminae', 'Shishi Hiiragi', '123', 'read');
let object2 = new Book(2, 'Verdants', 'Shishi Hiiragi', '145', 'read');

function init() {
	// Initialize event listeners
	const container = document.querySelector('.container');
	container.addEventListener('click', getClick);
}

function getClick(e) {
	// Check the operation to perform base on element.

	// Modal related conditions
	if (e.target.id === 'showBookModal') {
		showBookModal();
	} else if (e.target.id === 'closeBookModal') {
		closeBookModal();
	}
	console.log(e.target);
}

function showBookModal() {
	// This will show the modal for the book
	const modal = document.getElementById('addBookModal');
	modal.showModal();
}

function closeBookModal() {
	// This function will close the modal
	const modal = document.getElementById('addBookModal');
	modal.close();
}

init();