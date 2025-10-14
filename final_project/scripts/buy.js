const yearSpan = document.getElementById('currentyear');
yearSpan.textContent = new Date().getFullYear();

const lastModifiedEl = document.getElementById('lastModified');
lastModifiedEl.textContent = `Last modified: ${document.lastModified}`;

const navButtom = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav");

navButtom.addEventListener("click", () => {
    navButtom.classList.toggle("show");
    navBar.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", () => {
    const selectedBook = document.querySelector("#select_book")
    let books = [];

    const CreateOptionValues = (books) => {
        books.forEach(book => {
            const option = document.createElement("option");
            option.value = book.title;
            option.textContent = book.title;
            selectedBook.appendChild(option);
        });
    }

    async function GetBooksData() {
    try {
        const response = await fetch("books.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        books = data.books;

        console.table(books);
        CreateOptionValues(books);

        const savedBook = localStorage.getItem("selectedBook");
            if (savedBook) {
                selectedBook.value = savedBook;
            }
    } catch (error) {
        console.error("Error loading books data:", error);
    }
}
    selectedBook.addEventListener("change", () => {
        const selected = selectedBook.value;
        localStorage.setItem("selectedBook", selected);
        console.log(`Saved book: ${selected}`);
    });

    GetBooksData();
})

const hiddenField = document.querySelector("#timestamp");
const now = new Date().toLocaleString();
hiddenField.value = now;
