import "./styles.css";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

let library = [];
const bookListDisplay = document.querySelector(".book-list");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pageInput = document.getElementById("pages");
const isReadInput = document.getElementById("read-status");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    createNewBook();
    form.reset();
});


class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.uniqueID = crypto.randomUUID(); // Assigning a unique ID
    }

    getInfo() {
        return (`Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Is Read: ${this.isRead}, UID: ${this.uniqueID}`);
    }

    setRead(newRead) {
        this.isRead = newRead;
    }
}

let testBook1 = new Book("Interstellar", "Me", 100, false);
let testBook2 = new Book("Another Book", "Him", 9999, true);
library.push(testBook1);
library.push(testBook2);
refreshBookListDisplay();

function createNewBook() {
    const newBook = new Book(titleInput.value, authorInput.value, pageInput.value, isReadInput.value === "read" ? true : false);
    library.push(newBook);
    refreshBookListDisplay();
}

function createBookListCard(inBook) {
    let cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.setAttribute("data-id", `${inBook.uniqueID}`);
    cardElement.innerHTML =
        `
        <h2 class="book-title">
            <small class="book-author">
                ${inBook.author}
            </small>
            ${inBook.title}
        </h2>
        <p class="book-description">
            test
        </p>
        <div class="bottom-area">
            <span class="book-pages">
                ${inBook.pages} pages
            </span>
            <label class="switch">
                <input type="checkbox" ${inBook.isRead === true ? "checked" : ""}>
                <span class="slider round"></span>
            </label>
        </div>
        <button type="button" class="remove-book-btn">Remove</button>
    `;

    return cardElement;
}

function removeFromBookList(removedBookID) {
    library = library.filter((book) => book.uniqueID !== removedBookID);
    refreshBookListDisplay();
}

function refreshBookListDisplay() {
    bookListDisplay.innerHTML = " ";
    library.forEach(element => {
        // Button to remove book from the booklist
        let newCard = createBookListCard(element);
        newCard.querySelector(".remove-book-btn").addEventListener("click", (e) => {
            removeFromBookList(e.target.parentNode.dataset.id);
        });

        // Changing book read status
        newCard.querySelector(".switch input").addEventListener("change", (e) => {
            let correspondingBook = library.find(book => book.uniqueID === e.target.parentNode.parentNode.parentNode.dataset.id);
            correspondingBook.setRead(e.target.checked);
        });
        bookListDisplay.prepend(newCard);
    });
    console.log(library);
}