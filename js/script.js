function init() {
	// Initialize event listeners
	const container = document.querySelector('.container');
	container.addEventListener('click', getClick);
}

function getClick(e) {
	// Check the operation to perform base on element.

	// Modal related conditions
	if (e.target.id === 'showBookModal') {
		return showBookModal();
	} else if (e.target.id === 'closeBookModal') {
		return closeBookModal();
	}
	console.log(e.target);
}

function showBookModal() {
	// This will show the modal for the book
	const modal = document.getElementById('addBookModal');
	modal.showModal();
	return;
}

function closeBookModal() {
	const modal = document.getElementById('addBookModal');
	modal.close();
	return;
} 

init();