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

const cards = document.getElementById("books_container")

let books = [];

async function GetBooksData() {
    try {
        const response = await fetch("books.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        books = data.books;
        console.table(books);
        CreateBooksCards(books);

    } catch (error) {
        console.error("Error loading books data:", error);
    }
}

GetBooksData();

function getStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = "";

    for (let i = 0; i < fullStars; i++) {
        stars += "★";
    }

    if (halfStar) {
        stars += "☆";
    }

    while (stars.length < 5) {
        stars += "☆";
    }

    return stars;
}

const CreateBooksCards = (books) => {
    books.forEach(book => {
        const card = document.createElement("div");
        const stars = getStars(book.rating);
        card.classList.add("card");
        card.innerHTML= `
        <img src= "${book.image}" alt= "${book.title}" loading= "lazy" width= "200" height= "280">
        <h2>${book.title}</h2>
        <p class="author">${book.author}</p>
        <p class="stars">${stars}</p>
        <strong>$${book.price}</strong>
        <button class="show-btn">View Details</button>`
        
        cards.appendChild(card);
        card.querySelector(".show-btn").addEventListener("click", () => {
            DisplayBooksDetails(book);
        })
    });
}

const booksDetails = document.querySelector("#books_info");
function DisplayBooksDetails(book){
    booksDetails.innerHTML= "";
    booksDetails.innerHTML= `
    <button id="close-modal">x</button>
    <p><strong>Title: </strong>${book.title}</p>
    <p><strong>Author: </strong>${book.author}</p>
    <p><strong>Description: </strong>${book.description}</p>
    <p><strong>Genre: </strong>${book.genre}</p>
    <p><strong>Year: </strong>${book.year}</p>
    <p><strong>Publisher: </strong>${book.publisher}</p>
    <p><strong>Rating: </strong>${book.rating}</p>
    <p><strong>Price: </strong>$${book.price}</p>`;
    booksDetails.showModal();
    const closeModal = document.querySelector("#close-modal");
    closeModal.addEventListener("click", () =>{
        booksDetails.close();
    })
}

const allBooks = document.querySelector("#all");
allBooks.addEventListener("click", () => {
    cards.innerHTML = "";
    CreateBooksCards(books);
});

const classicBooks = document.querySelector("#classic");
classicBooks.addEventListener("click", () => {
    cards.innerHTML= ""; 
    CreateBooksCards(books.filter(book => book.genre.includes("Classic")));
})

const fantasyBooks = document.querySelector("#fantasy");
fantasyBooks.addEventListener("click", () => {
    cards.innerHTML= ""; 
    CreateBooksCards(books.filter(book => book.genre.includes("Fantasy")));
})

const romanceBooks = document.querySelector("#romance");
romanceBooks.addEventListener("click", () => {
    cards.innerHTML= ""; 
    CreateBooksCards(books.filter(book => book.genre.includes("Romance")));
})

const fictionBooks = document.querySelector("#fiction");
fictionBooks.addEventListener("click", () => {
    cards.innerHTML= ""; 
    CreateBooksCards(books.filter(book => book.genre.includes("Fiction")));
})