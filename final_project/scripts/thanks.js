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

const getString = window.location.search;
console.log(getString);

const myInfo = new URLSearchParams(getString);
console.log(myInfo);

document.querySelector("#details").innerHTML = `
<h2>Thank you for your purchase!</h2>
<p><strong>Customer Name: </strong>${myInfo.get("fname")} ${myInfo.get("lname")}
<p><strong>Email: </strong>${myInfo.get("email")}</p>
<p><strong>Phone Number: </strong>${myInfo.get("phone")}</p>
<p><strong>Address: </strong>${myInfo.get("address")}</p>
<p><strong>Book: </strong>${myInfo.get("book")}</p>
<p><strong>Purchase Date: </strong>${myInfo.get("timestamp")}</p>`;

