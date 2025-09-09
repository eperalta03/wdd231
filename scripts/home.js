const navButtom = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

navButtom.addEventListener("click", () => {
    navButtom.classList.toggle("show");
    navBar.classList.toggle("show");
});

const yearSpan = document.getElementById('currentyear');
yearSpan.textContent = new Date().getFullYear();

const lastModifiedEl = document.getElementById('lastModified');
lastModifiedEl.textContent = `Last modified: ${document.lastModified}`;