const navButtom = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav");

navButtom.addEventListener("click", () => {
    navButtom.classList.toggle("show");
    navBar.classList.toggle("show");
});

const yearSpan = document.getElementById('currentyear');
yearSpan.textContent = new Date().getFullYear();

const lastModifiedEl = document.getElementById('lastModified');
lastModifiedEl.textContent = `Last modified: ${document.lastModified}`;

const cards = document.querySelector("#items");

async function GetItemsData() {
    const response = await fetch("items.json");
    const data = await response.json();
    console.log(data);
    DisplayItemsInfo(data.items);
}

GetItemsData();

const DisplayItemsInfo = (items) => {
    items.forEach(item => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML= `
        <h2>${item.name}</h2>
        <figure>
            <img src="${item.image}" alt="${item.name}" loading= "lazy" width= "300" height= "200">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button><strong>Learn More</strong></button>
        `
        cards.appendChild(card);
    });
}

const messageBox = document.getElementById('messageBox');
const closeBtn = document.getElementById('closeBtn');
const messageEl = document.getElementById('message');
const now = new Date();

const lastVisit = localStorage.getItem('lastVisit');

if (!lastVisit) {
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const lastVisitDate = new Date(lastVisit);
    const diffMs = now - lastVisitDate; 
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); 

    if (diffDays < 1) {
        messageEl.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        messageEl.textContent = "You last visited 1 day ago.";
    } else {
        messageEl.textContent = `You last visited ${diffDays} days ago.`;
    }
}



localStorage.setItem('lastVisit', now.toISOString());

closeBtn.addEventListener('click', () => {
  messageBox.style.display = 'none';
});