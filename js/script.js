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
	// Delete book
	else if (e.target.className === 'delete-book-btn') removeBookFromLibrary(e);
	// Toggle status
	else if (e.target.className === 'toggle-status-btn') changeReadStatus(e);

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
		bookCard.dataset.bookId = book.id;
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
		statusBtn.className = 'toggle-status-btn';
		if (book.read === 'read') statusBtn.textContent = 'Mark as read';
		else if(book.read === 'not read') statusBtn.textContent = 'Mark as unread';
		toolBox.appendChild(statusBtn);

		// Delete button
		let deleteBtn = document.createElement('button');
		deleteBtn.type = 'button';
		deleteBtn.className = 'delete-book-btn';
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

	// this will assign the user input and generated uuid for the book
	const id = crypto.randomUUID();
	const title = titleInput.value;
	const author = authorInput.value;
	const pages = pagesInput.value;
	const status = statusSelect.value;

	const newBook = new Book(id, title, author, pages, status);
	myLibrary.push(newBook);
	closeBookModal();
	refreshLibrary();
	displayBooks();
}

function refreshLibrary () {
	// this will remove clear the books inside the wrapper
	let books = document.querySelectorAll('.book');
	let libraryWrapper = document.querySelector('.wrapper');
	books.forEach(book => {
		libraryWrapper.removeChild(book);
	})
}

function removeBookFromLibrary (e) {
	// This will remove the book in myLibrary list
	const books = document.querySelectorAll('.book');
	const bookId = e.target.parentElement.parentElement.dataset.bookId;

	// Update the library using reduce
	const newLibrary = myLibrary.reduce((updatedLib, book) => {
		if (book.id !== bookId) updatedLib.push(book);
		return updatedLib;
	}, []);
	
	myLibrary = newLibrary;
	refreshLibrary();
	displayBooks();
}

function changeReadStatus(e) {
	// This will match the selected id

	const bookId = e.target.parentElement.parentElement.dataset.bookId;
	myLibrary.forEach(book => {
		if (book.id === bookId) book.toggleRead(e);
	})
}

Book.prototype.toggleRead = function (e) {
	// This will change the read status of matching object
	if (this.read === 'not read') {
		this.read = 'read'
		e.target.textContent = 'Mark as read';
	} else if (this.read === 'read') {
		this.read = 'not read';
		e.target.textContent = 'Mark as unread'; 
	}
}
init();