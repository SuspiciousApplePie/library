let myLibrary = [];

function Book(id, name, author, page, read) {
	// Book constructor will be used on creating books.
	this.id = id;
	this.name = name;
	this.author = author;
	this.page = page;
	this.read = read;
}

function init() {
	// Initialize event listeners
	const container = document.querySelector('.container');
	container.addEventListener('click', getClick);
	displayBooks();
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

	// Adding book
	if (e.target.id === 'addBookBtn') addBookToLibrary(e);
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
		
		// Author name
		let author = document.createElement('p');
		author.textContent = `Written by: ${book.author}`;
		description.appendChild(author);

		// Book description
		let pageCount = document.createElement('p');
		pageCount.textContent = `${book.page} pages`;
		description.appendChild(pageCount);

		bookCard.appendChild(description);

		// This will add the buttons
		let toolBox = document.createElement('div');
		toolBox.className = 'toolbox'

		// Status toggle button
		let statusBtn = document.createElement('button');
		statusBtn.type = 'button';
		statusBtn.textContent = 'Mark as read';
		toolBox.appendChild(statusBtn);

		// Delete button
		let deleteBtn = document.createElement('button');
		deleteBtn.type = 'button';
		deleteBtn.textContent = 'Delete';
		toolBox.appendChild(deleteBtn);

		bookCard.appendChild(toolBox);
	});
}

function addBookToLibrary (e) {
	e.preventDefault();
	// This will push new books to library
	const titleInput = document.querySelector('#title');
	const authorInput = document.querySelector('#author');
	const pagesInput = document.querySelector('#pages');
	const statusSelect = document.querySelector('#status');

	const id = crypto.randomUUID();
	const title = titleInput.value;
	const author = authorInput.value;
	const pages = pagesInput.value;
	const status = statusSelect.value;

	const newBook = new Book(id, title, author, pages, statusSelect);
	myLibrary.push(newBook);
	closeBookModal();
	refreshLibrary();
	displayBooks();
}

function refreshLibrary () {
	let books = document.querySelectorAll('.book');
	let libraryWrapper = document.querySelector('.wrapper');
	books.forEach(book => {
		libraryWrapper.removeChild(book);
	})
}

init();