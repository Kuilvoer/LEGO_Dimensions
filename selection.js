// selection.js

const OWNED_CLASS = "owned";

function loadOwned() {
  return JSON.parse(localStorage.getItem("ownedCharacters") || "[]");
}

function saveOwned(list) {
  localStorage.setItem("ownedCharacters", JSON.stringify(list));
}

function applyOwnedSelections() {
  const owned = loadOwned();

  document.querySelectorAll("#grid .card").forEach(card => {
    const name = card.querySelector(".name")?.textContent;
    if (!name) return;

    // If we already added a checkbox, skip
    if (card.querySelector(".owned-checkbox")) return;

    // Create checkbox container
    const box = document.createElement("input");
    box.type = "checkbox";
    box.className = "owned-checkbox";
    box.title = "Mark as owned";

    // Set initial state
    if (owned.includes(name)) {
      card.classList.add(OWNED_CLASS);
      box.checked = true;
    }

    // Handle toggling
    box.addEventListener("change", () => {
      let list = loadOwned();
      if (box.checked) {
        if (!list.includes(name)) list.push(name);
        card.classList.add(OWNED_CLASS);
      } else {
        list = list.filter(n => n !== name);
        card.classList.remove(OWNED_CLASS);
      }
      saveOwned(list);
    });

    // Add to card (absolute positioned in CSS)
    card.appendChild(box);
  });
}

// Re-apply whenever grid changes
const observer = new MutationObserver(applyOwnedSelections);
observer.observe(document.querySelector("#grid"), { childList: true, subtree: true });

applyOwnedSelections();