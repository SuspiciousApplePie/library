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

myLibrary.push(object1);
myLibrary.push(object2);

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

function displayBooks() {
	// This will display the books in the list.
	const libraryWrapper = document.querySelector('.wrapper');
	myLibrary.forEach(book => {

		// This will make a new book card inside wrapper
		let bookCard = document.createElement('div');
		bookCard.className = 'book';
		bookCard.id = book.id;
		libraryWrapper.appendChild(bookCard);

		// This will add the title
		let bookTitle = document.createElement('h1');
		bookTitle.className = 'title';
		bookTitle.textContent = book.name;
		bookCard.appendChild(bookTitle);

		// This will add the description
		let description = document.createElement('div');
		description.className = 'description';
		
		let author = document.createElement('p');
		author.textContent = `Written by: ${book.author}`;
		description.appendChild(author);
		
		let pageCount = document.createElement('p');
		pageCount.textContent = `${book.page} pages`;
		description.appendChild(pageCount);

		bookCard.appendChild(description);

		// This will add the buttons
		let toolBox = document.createElement('div');
		toolBox.className = 'toolbox'

		let statusBtn = document.createElement('button');
		statusBtn.type = 'button';
		statusBtn.textContent = 'Mark as read';
		toolBox.appendChild(statusBtn);

		let deleteBtn = document.createElement('button');
		deleteBtn.type = 'button';
		deleteBtn.textContent = 'Delete';
		toolBox.appendChild(deleteBtn);

		bookCard.appendChild(toolBox);
	});
}

displayBooks();
init();