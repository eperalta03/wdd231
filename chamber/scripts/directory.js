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

const cards = document.querySelector("#members");

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");



gridbutton.addEventListener("click", () => {
	
	cards.classList.add("grid");
	
	cards.classList.remove("list");
});

listbutton.addEventListener("click", showList); 

function showList() {
	cards.classList.add("list");
	cards.classList.remove("grid");
}

async function getMembersData() {
    const response = await fetch("members.json");
    const data = await response.json();
    console.table(data);
    displayMembers(data.members);
}

getMembersData();

const displayMembers = (members) => {
    members.forEach((member) => {
    let card = document.createElement("section");
    let title = document.createElement("div");
    let picture = document.createElement("div");
    let info =  document.createElement("div");
    
    card.classList.add("card-container");
    title.classList.add("title-container");
    picture.classList.add("picture-container");
    info.classList.add("info-container");

    let companyName = document.createElement("h2");
    let industry = document.createElement("p")
    let logo = document.createElement("img");
    let email = document.createElement("p");
    let phone = document.createElement("p");
    let url = document.createElement("a");

    companyName.textContent = `${member.name}`;
    industry.textContent = `${member.industry}`
    
    logo.setAttribute("src", `${member.logo}`);
    logo.setAttribute("alt", `${member.name}`);
    logo.setAttribute("loading", "lazy");
    logo.setAttribute("width", "110");
    logo.setAttribute("height", "110");
    
    email.innerHTML = `<strong>EMAIL:</strong> ${member.email}`;
    phone.innerHTML = `<strong>PHONE:</strong> ${member.phone}`;
    url.setAttribute("href", `${member.website}`);
    url.setAttribute("target", "_blank");
    url.innerHTML = `<strong>URL: </strong>${member.website}`;

    title.appendChild(companyName);
    title.appendChild(industry);

    picture.appendChild(logo);

    info.appendChild(email);
    info.appendChild(phone);
    info.appendChild(url);

    card.appendChild(title);
    card.appendChild(picture);
    card.appendChild(info);
    
     cards.appendChild(card);
    });
}