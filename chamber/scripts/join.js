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

const memberships = [
  {
    type: "Non-Profit",
    cost: 0, 
    benefits: [
      "Basic directory listing",
      "Access to community events"
    ]
  },
  {
    type: "Bronze",
    cost: 50, 
    benefits: [
      "All Non-Profit benefits",
      "Event discounts",
      "Access to training workshops"
    ]
  },
  {
    type: "Silver",
    cost: 100,
    benefits: [
      "All Bronze benefits",
      "Advertising opportunities",
      "Spotlight position on home page",
      "Special networking events"
    ]
  },
  {
    type: "Gold",
    cost: 200,
    benefits: [
      "All Silver benefits",
      "Premium advertising placement",
      "Exclusive VIP events",
      "Maximum event discounts",
      "Recognition on sponsor page"
    ]
  }
];
const membershipDetails = document.querySelector("#membership-details")
function DisplayMembershipDetails(membership){
    membershipDetails.innerHTML="";
    membershipDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${membership.type} Membership Level</h2>
        <p>Cost: $${membership.cost}</p>
        <p>Benefits:</p>
        <ul>
            ${membership.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
    `;
    membershipDetails.showModal();
    const closeModal = document.querySelector("#closeModal");
    closeModal.addEventListener("click", () => {
        membershipDetails.close();
  });
}

const container = document.querySelector("#memberships");
function createMembershipCards(memberships){
    memberships.forEach(membership => {
    const card = document.createElement("div");
    card.classList.add("card");
    
    card.innerHTML = `
        <strong>${membership.type} Membership Level</strong>
        <button class="show-details-btn">Learn More</button>`;

    container.appendChild(card);
    card.querySelector(".show-details-btn").addEventListener('click', () => {
        DisplayMembershipDetails(membership);
    });
    });

}

createMembershipCards(memberships);

const hiddenField = document.querySelector("#timestamp");
const now = new Date().toLocaleString();
hiddenField.value = now;


  
