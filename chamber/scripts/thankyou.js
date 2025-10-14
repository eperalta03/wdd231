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

const getString = window.location.search;
console.log(getString);

const myInfo = new URLSearchParams(getString);
console.log(myInfo);

document.querySelector("#details").innerHTML = `
<h2>Thank you for your aplication!</h2>
<p><strong>Applicant Name: </strong> ${myInfo.get("fname")} ${myInfo.get("lname")}</p>
<p><strong>Email: </strong>${myInfo.get("email")}</p>
<p><strong>Phone Number: </strong>${myInfo.get("phone")}</p>
<p><strong>Business Name: </strong>${myInfo.get("businessName")}</p>
<p><strong>Submit Date: </strong>${myInfo.get("timestamp")}</p>`;