const modal = document.querySelector("dialog");
const mainContainer = document.querySelector(".main-container");
const newBookButton = document.querySelector(".add-button");
const closeModal = document.querySelector(".close-modal");
const inputs = document.querySelectorAll("input");
const formSubmitButton = document.querySelector(".form-submit-button");
const bookLibrary = [];

function book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function resetInputFields() {
  inputs.forEach((input) => {
    input.value = "";
  });
}

newBookButton.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
  resetInputFields();
});

function getFormDetails() {
  const array = [];
  inputs.forEach((input) => {
    array.push(input.value);
  });
  return array;
}

function createBook(info) {
  const newBook = new book(info[0], info[1], info[2], info[3]);
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
    span.textContent = bookDetail.toUpperCase() + ":";
    const childDiv = document.createElement("div");
    childDiv.textContent = book[bookDetail];
    span.classList.add("text");
    div.append(span, childDiv);
    bookDetails.append(div);
  }
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  const changeStatusButton = document.createElement("button");
  const removeBookButton = document.createElement("button");
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
  const newBook = createBook(info);
  addToArray(newBook);
  createAndAppendElement(newBook);
  setTimeout(resetInputFields, 1000);
}

formSubmitButton.addEventListener("click", addBookToLibrary);
