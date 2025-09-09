const navButtom = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

navButtom.addEventListener("click", () => {
    navButtom.classList.toggle("show");
    navBar.classList.toggle("show");
});

