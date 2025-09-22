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

function getEligibleMembers(members) {
    return members.filter(member => 
        member.membership === "Gold" || member.membership === "Silver"
    );
}

function getRandomMembers(members, n) {
    const copy = [...members]; 
    const selected = [];

    for (let i = 0; i < n; i++) {
        if (copy.length === 0) break; 
        const index = Math.floor(Math.random() * copy.length);
        selected.push(copy[index]);
        copy.splice(index, 1); 
    }

    return selected;
}

async function getMembersData() {
    const response = await fetch("members.json");
    const data = await response.json();
    console.table(data);
    
    const eligible = getEligibleMembers(data.members);

    const randomMembers = getRandomMembers(eligible, 3);

    displayMembers(randomMembers); 
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
    let membership = document.createElement("p")

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
    membership.innerHTML = `<strong>MEMBERSHIP:</strong> ${member.membership}`;

    title.appendChild(companyName);
    title.appendChild(industry);

    picture.appendChild(logo);

    info.appendChild(email);
    info.appendChild(phone);
    info.appendChild(url);
    info.appendChild(membership);

    card.appendChild(title);
    card.appendChild(picture);
    card.appendChild(info);
    
     cards.appendChild(card);
    });
}

const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const forecast = document.querySelector("#current_forecast");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=25.54&lon=-103.39&units=imperial&appid=c71284daa7d278d5ad251652469f9439";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=25.54&lon=-103.39&units=imperial&appid=c71284daa7d278d5ad251652469f9439";

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }    
}

function displayResults(data) {
    
    function capitalizeWords(str) {
        return str.split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    
    function convertUnixToTime(unix) {
        const date = new Date(unix * 1000);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    
    currentTemp.innerHTML = "";
    const temp = document.createElement("ul");
    temp.classList.add("temp-list");

    temp.innerHTML = `
        <li><strong>${data.main.temp}</strong>&deg; F</li>
        <li>${capitalizeWords(data.weather[0].description)}</li>
        <li>High: ${data.main.temp_max}&deg;</li>
        <li>Low: ${data.main.temp_min}&deg;</li>
        <li>Humidity: ${data.main.humidity}%</li>
        <li>Sunrise: ${convertUnixToTime(data.sys.sunrise)}</li>
        <li>Sunset: ${convertUnixToTime(data.sys.sunset)}</li>
    `;

    currentTemp.appendChild(temp);

    
    const icon = document.createElement("img")
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    icon.setAttribute('src', iconsrc);
    icon.setAttribute('alt', data.weather[0].description);
    icon.setAttribute('loading', "lazy");

    weatherIcon.appendChild(icon);
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log("Pronóstico:", data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecast(data){

    function getDayName(unix) {
    const date = new Date(unix * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" });
    }

    forecast.innerHTML= "";
    const fcast = document.createElement("ul");
    fcast.classList.add("fcast_list");

    fcast.innerHTML = `
    <li><strong>${getDayName(data.list[0].dt)}:</strong> ${data.list[0].main.temp}&deg; F</li>
    <li><strong>${getDayName(data.list[3].dt)}:</strong> ${data.list[3].main.temp}&deg; F</li>
    <li><strong>${getDayName(data.list[11].dt)}:</strong> ${data.list[11].main.temp}&deg; F</li>`

    forecast.appendChild(fcast);
}
apiFetch();
fetchForecast();