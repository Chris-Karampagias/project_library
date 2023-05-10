const modal = document.querySelector("dialog");
const form = document.querySelector("form");
const mainContainer = document.querySelector(".main-container");
const newBookButton = document.querySelector(".add-button");
const closeModal = document.querySelector(".close-modal");
const inputs = document.querySelectorAll("input");
const selectForm = document.getElementById("book-status-form");
const formSubmitButton = document.querySelector(".form-submit-button");
const pages = document.getElementById("book-pages-form");
const bookLibrary = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function resetInputFields() {
  inputs.forEach((input) => {
    input.value = "";
  });
}

pages.addEventListener("input", () => {
  if (pages.validity.rangeUnderflow) {
    pages.setCustomValidity(`Minimum ${pages.min} pages!`);
  } else if (pages.validity.rangeOverflow) {
    pages.setCustomValidity(`Maximum ${pages.max} pages!`);
  } else {
    pages.setCustomValidity("");
  }
});

form.addEventListener("submit", (e) => {
  if (!pages.validity.valid) {
    e.preventDefault();
  } else {
    addBookToLibrary();
  }
});

function getFormDetails() {
  const array = [];
  inputs.forEach((input) => {
    array.push(input.value);
  });
  array.push(selectForm.value);
  return array;
}

function createBook(info) {
  const newBook = new Book(info[0], info[1], info[2], info[3]);
  return newBook;
}

function addToArray(newBook) {
  bookLibrary.push(newBook);
}

function createAndAppendElement(book) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book");
  const image = document.createElement("img");
  image.setAttribute("src", "fonts&images/book-cover-placeholder.png");
  const bookDetails = document.createElement("div");
  bookDetails.classList.add("book-details");
  for (const bookDetail in book) {
    const div = document.createElement("div");
    const span = document.createElement("span");
    span.textContent = `${bookDetail.toUpperCase()}:`;
    const childDiv = document.createElement("div");
    childDiv.textContent = book[bookDetail];
    span.classList.add("text");
    div.append(span, childDiv);
    bookDetails.append(div);
  }
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  const changeStatusButton = document.createElement("button");
  changeStatusButton.addEventListener("click", changeStatus);
  const removeBookButton = document.createElement("button");
  removeBookButton.addEventListener("click", (e) => {
    deleteBookFromLibrary(e);
  });
  changeStatusButton.classList.add("book-change-status");
  changeStatusButton.textContent = "Change Status";
  removeBookButton.textContent = "Remove";
  removeBookButton.classList.add("book-remove");
  buttonsContainer.append(changeStatusButton, removeBookButton);
  bookContainer.append(image, bookDetails, buttonsContainer);
  mainContainer.append(bookContainer);
}

function addBookToLibrary() {
  const info = getFormDetails();
  if (info.includes("") || Number(info[2]) != info[2]) {
    return;
  }
  const newBook = createBook(info);
  addToArray(newBook);
  createAndAppendElement(newBook);
  setTimeout(resetInputFields, 1000);
}

function getDeletedBookIndex(e) {
  const title =
    e.target.parentElement.previousElementSibling.firstElementChild
      .lastElementChild.textContent;
  const index = bookLibrary.findIndex((obj) => obj.title === title);
  return index;
}

function deleteFromArray(index) {
  bookLibrary.splice(index, 1);
}

function deleteFromDOM(e) {
  e.target.parentElement.parentElement.remove();
}

function deleteBookFromLibrary(e) {
  const index = getDeletedBookIndex(e);
  deleteFromArray(index);
  deleteFromDOM(e);
}

function getCurrentStatus(e) {
  const currentStatus =
    e.target.parentElement.previousElementSibling.lastElementChild
      .lastElementChild.textContent;
  return currentStatus;
}

function changeStatus(e) {
  const currentStatus = getCurrentStatus(e);
  if (currentStatus.includes("Not")) {
    e.target.parentElement.previousElementSibling.lastElementChild.lastElementChild.textContent =
      "Read";
  } else {
    e.target.parentElement.previousElementSibling.lastElementChild.lastElementChild.textContent =
      "Not Read";
  }
}

function displayBooks(array) {
  array.forEach((item) => {
    createAndAppendElement(item);
  });
}

window.addEventListener("load", () => {
  displayBooks(bookLibrary);
});

newBookButton.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
  resetInputFields();
});
