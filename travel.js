
// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});


// DESTINATION FILTERS

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".destination-card");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";

function showDestinations() {
  let searchText = searchInput.value.toLowerCase().trim();
  let count = 0;

  cards.forEach(function (card) {
    let category = card.dataset.category;
    let name = card.dataset.name;
    let isFavorite = card.querySelector(".heart").classList.contains("saved");

    let matchesCategory =
      selectedCategory === "all" ||
      category === selectedCategory ||
      (selectedCategory === "favorites" && isFavorite);

    let matchesSearch = name.includes(searchText);

    if (matchesCategory && matchesSearch) {
      card.style.display = "block";
      count++;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display = count === 0 ? "block" : "none";
}

filters.forEach(function (button) {
  button.addEventListener("click", function () {
    filters.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");
    selectedCategory = button.dataset.filter;
    showDestinations();
  });
});


// SEARCH DESTINATIONS

document.getElementById("searchBtn").addEventListener("click", function () {
  selectedCategory = "all";

  filters.forEach(function (button) {
    button.classList.remove("active");
  });

  filters[0].classList.add("active");

  showDestinations();

  document.getElementById("destinations").scrollIntoView({
    behavior: "smooth"
  });
});

searchInput.addEventListener("input", showDestinations);


// FAVOURITE DESTINATIONS

document.querySelectorAll(".heart").forEach(function (button) {
  button.addEventListener("click", function () {
    button.classList.toggle("saved");

    if (button.classList.contains("saved")) {
      button.textContent = "♥";
    } else {
      button.textContent = "♡";
    }

    showDestinations();
  });
});


// TRIP DETAILS POPUP

const modal = document.getElementById("tripModal");
const modalTitle = document.getElementById("modalTitle");
const modalDetails = document.getElementById("modalDetails");

document.querySelectorAll(".view-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    let place = button.dataset.place;
    let card = button.closest(".destination-card");
    let price = card.querySelector(".card-bottom strong").textContent;

    modalTitle.textContent = place;
    modalDetails.textContent =
      "Explore " + place + " with packages starting from " +
      price + ". Contact us to plan your dream getaway!";

    modal.classList.add("show");
  });
});

document.getElementById("closeModal").addEventListener("click", function () {
  modal.classList.remove("show");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.classList.remove("show");
  }
});


// NEWSLETTER FORM

document.getElementById("newsletterForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let email = document.getElementById("email").value;

  if (email.trim() !== "") {
    document.getElementById("formMessage").textContent =
      "Thank you for joining! This is a demo subscription.";

    document.getElementById("email").value = "";
  }
});
