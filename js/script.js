let myLibrary = [];

class Book {
	constructor (id, name, author, page, read) {
		this.id = id;
		this.name = name;
		this.author = author;
		this.page = page;
		this.read = read;
	}

	toggleRead (e) {
		if (this.read === 'not read') {
			this.read = 'read'
			e.target.textContent = 'Mark as unread';
		} else if (this.read === 'read') {
			this.read = 'not read';
			e.target.textContent = 'Mark as read'; 
		}
	}
}

function init() {
	// Initialize event listeners
	const container = document.querySelector('.container');
	container.addEventListener('click', getClick);
	container.addEventListener("input", validateInput);
	container.addEventListener('submit', validateForm);
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

	// Delete book
	if (e.target.className === 'delete-book-btn') removeBookFromLibrary(e);
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
	// Refresh the page
	const libraryWrapper = document.querySelector('.wrapper');
	libraryWrapper.innerHTML = '';

	// This will display the books in the list.
	myLibrary.forEach(book => {
		createBookCard(libraryWrapper, book);
	});
}


function createBookCard(libraryWrapper, book) {

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
		
	if (book.read === 'read') statusBtn.textContent = 'Mark as unread';
	else if(book.read === 'not read') statusBtn.textContent = 'Mark as read';
	toolBox.appendChild(statusBtn);

	// Delete button
	let deleteBtn = document.createElement('button');
	deleteBtn.type = 'button';
	deleteBtn.className = 'delete-book-btn';
	deleteBtn.textContent = 'Delete';
	toolBox.appendChild(deleteBtn);

	bookCard.appendChild(toolBox);
}

function addBookToLibrary (form) {

	// This will select all fields
	const titleInput = form.querySelector('#title');
	const authorInput = form.querySelector('#author');
	const pagesInput = form.querySelector('#pages');
	const statusSelect = form.querySelector('#status');

	// this will assign the user input and generated uuid for the book
	const id = crypto.randomUUID();
	const title = titleInput.value;
	const author = authorInput.value;
	const pages = pagesInput.value;
	const status = statusSelect.value;

	// Add new bookS
	const newBook = new Book(id, title, author, pages, status);
	myLibrary.push(newBook);
	closeBookModal();
	addBookForm.reset();
	displayBooks();
}

function removeBookFromLibrary (e) {
	// This will remove the book in myLibrary list
	const bookId = e.target.parentElement.parentElement.dataset.bookId;

	// Update the library using filter
	const newLibrary = myLibrary.filter(book => book.id !== bookId);
	myLibrary = newLibrary;

	// Update the UI after change
	const bookCard = document.querySelector(`[data-book-id="${bookId}"]`);
	bookCard.remove();
}

function changeReadStatus(e) {
	// This will match the selected id

	const bookId = e.target.parentElement.parentElement.dataset.bookId;
	myLibrary.forEach(book => {
		if (book.id === bookId) book.toggleRead(e);
	})
}

function validateForm(e) {
	e.preventDefault();
	const form = e.target.closest("form");
	const isTitleValid = checkTitleLength(form) && checkAuthorLength(form) && checkPageCount(form);
	if (isTitleValid) addBookToLibrary(form);
}

function checkTitleLength(form) {
	const title = form.querySelector('#title');
	title.reportValidity();
	if (title.validity.tooShort) {
		title.setCustomValidity("Your title is dwarf should be 5");
		return false;
	} else if (title.validity.valueMissing) {
		title.setCustomValidity("Dawg, there is no book without title.");
		return false;
	} else {
		title.setCustomValidity("");
	}
	return true;
}

function checkAuthorLength(form) {
	const author = form.querySelector('#author');
	author.reportValidity();
	if (author.validity.valueMissing) {
		author.setCustomValidity("The author must have been the wind gng.");
		return false;
	} else {
		author.setCustomValidity("");
		return true;
	}
}

function checkPageCount(form) {
	const pages = form.querySelector('#pages');
	pages.reportValidity();
	if (pages.validity.rangeUnderflow) {
		pages.setCustomValidity("No pages book CHAMP?");
		return false;
	} else if (pages.validity.valueMissing) {
		pages.setCustomValidity("Bro, enter the page.");
		return false;
	} else {
		pages.setCustomValidity("");
		return true;
	}
}

function validateInput(e) {
	e.target.reportValidity();
	if (e.target.closest("#title")) {
		checkTitleInput(e.target);
	} else if (e.target.closest("#author")) {
		checkAuthorInput(e.target);
	} else if (e.target.closest("#pages")) {
		checkPageInput(e.target);
	}
}

function checkTitleInput(title) {
	if (title.validity.tooShort) {
		title.setCustomValidity("Your title is dwarf should be 5");
	} else if (title.validity.valueMissing) {
		title.setCustomValidity("Dawg, there is no book without title.");
	} else {
		title.setCustomValidity("");
	}
}

function checkAuthorInput(author) {
	if (author.validity.valueMissing) {
		author.setCustomValidity("The author must have been the wind gng.");
	} else {
		author.setCustomValidity("");
	}
}

function checkPageInput(pages) {
	if (pages.validity.rangeUnderflow) {
		pages.setCustomValidity("No pages book CHAMP?");
	} else if (pages.validity.valueMissing) {
		pages.setCustomValidity("Bro, enter the page.");
	} else {
		pages.setCustomValidity("");
	}
}

init();