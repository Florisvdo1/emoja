// Categorieën en emojis
const categories = ["events", "emotion", "travel", "art", "tech", "objects"];
let currentCategoryIndex = 0;

// Emoji data
const emojiData = {
  events: [
    { char: "🎉", name: "feest party" },
    { char: "🎂", name: "taart cake" },
    { char: "🎆", name: "vuurwerk fireworks" },
    { char: "🎇", name: "sterretje sparkler" },
    { char: "🎈", name: "ballon balloon" },
    { char: "🎊", name: "confetti" },
    { char: "🥳", name: "feestgezicht partying" },
    { char: "🎃", name: "pompoen pumpkin" },
    { char: "🎄", name: "kerstboom christmas tree" },
    { char: "🎅", name: "kerstman santa" },
  ],
  emotion: [
    { char: "😀", name: "glimlach smile" },
    { char: "😃", name: "lach smile" },
    { char: "😄", name: "breed lach big smile" },
    { char: "😁", name: "big grin" },
    { char: "😂", name: "tranen van het lachen tears of joy" },
    { char: "🤣", name: "rol lachen rofl" },
    { char: "😊", name: "verlegen lach shy smile" },
    { char: "🥰", name: "liefdevol loving" },
    { char: "😍", name: "verliefd in love" },
    { char: "🤩", name: "onder de indruk impressed" },
  ],
  // Voeg hier andere categorieën toe...
};

// Variabelen voor drag-and-drop en zoekfunctie
let draggedEmoji = null;
let draggedFromPlaceholder = null;
const searchInput = document.querySelector(".search-bar");
const emojiDeck = document.querySelector(".emoji-deck");
const placeholders = document.querySelectorAll(".placeholder");

// Plaats emoji's in het deck
function displayEmojis() {
  emojiDeck.innerHTML = "";

  // Huidige categorie
  const category = categories[currentCategoryIndex];
  const emojis = emojiData[category];

  emojis.forEach((emoji) => {
    const span = document.createElement("span");
    span.classList.add("emoji-item");
    span.textContent = emoji.char;
    span.setAttribute("aria-label", emoji.name);
    span.addEventListener("touchstart", startDragging);
    emojiDeck.appendChild(span);
  });

  // Pijltjes voor categorie navigatie
  const leftArrow = document.createElement("div");
  leftArrow.className = "arrow-left emoji-item";
  leftArrow.textContent = "◀️";
  leftArrow.addEventListener("click", prevCategory);
  emojiDeck.prepend(leftArrow);

  const rightArrow = document.createElement("div");
  rightArrow.className = "arrow-right emoji-item";
  rightArrow.textContent = "▶️";
  rightArrow.addEventListener("click", nextCategory);
  emojiDeck.appendChild(rightArrow);
}

// Drag-and-drop functionaliteit
function startDragging(e) {
  const target = e.target;
  if (!target.classList.contains("emoji-item")) return;

  draggedEmoji = target.cloneNode(true);
  draggedEmoji.classList.add("dragging");
  document.body.appendChild(draggedEmoji);

  const moveAt = (x, y) => {
    draggedEmoji.style.left = `${x - draggedEmoji.offsetWidth / 2}px`;
    draggedEmoji.style.top = `${y - draggedEmoji.offsetHeight / 2}px`;
  };

  const onTouchMove = (event) => {
    const touch = event.touches[0];
    moveAt(touch.pageX, touch.pageY);
  };

  const onTouchEnd = () => {
    document.body.removeChild(draggedEmoji);
    draggedEmoji = null;
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  };

  document.addEventListener("touchmove", onTouchMove);
  document.addEventListener("touchend", onTouchEnd);

  moveAt(e.touches[0].pageX, e.touches[0].pageY);
}

// Zoekfunctie
function filterEmojis() {
  const term = searchInput.value.toLowerCase();
  const category = categories[currentCategoryIndex];
  const filteredEmojis = emojiData[category].filter((emoji) =>
    emoji.name.toLowerCase().includes(term)
  );

  emojiDeck.innerHTML = "";
  filteredEmojis.forEach((emoji) => {
    const span = document.createElement("span");
    span.classList.add("emoji-item");
    span.textContent = emoji.char;
    span.setAttribute("aria-label", emoji.name);
    span.addEventListener("touchstart", startDragging);
    emojiDeck.appendChild(span);
  });
}

// Navigatie tussen categorieën
function prevCategory() {
  currentCategoryIndex =
    (currentCategoryIndex - 1 + categories.length) % categories.length;
  displayEmojis();
}

function nextCategory() {
  currentCategoryIndex =
    (currentCategoryIndex + 1) % categories.length;
  displayEmojis();
}

// Reset alles
document.querySelector(".reset-alles-btn").addEventListener("click", () => {
  placeholders.forEach((placeholder) => {
    placeholder.textContent = "?";
    placeholder.classList.add("empty");
  });
});

// Huiswerk knop
document.querySelector(".huiswerk-btn").addEventListener("click", (e) => {
  e.target.classList.toggle("active");
  if (e.target.classList.contains("active")) {
    e.target.textContent = "Huiswerk 👍";
    triggerConfetti();
  } else {
    e.target.textContent = "Huiswerk";
  }
});

// Confetti animatie
function triggerConfetti() {
  const confettiContainer = document.querySelector(".confetti-container");
  confettiContainer.innerHTML = "";

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confettiContainer.appendChild(confetti);
  }

  setTimeout(() => {
    confettiContainer.innerHTML = "";
  }, 3000);
}

// Initialiseer app
document.addEventListener("DOMContentLoaded", () => {
  displayEmojis();
  searchInput.addEventListener("input", filterEmojis);
});
