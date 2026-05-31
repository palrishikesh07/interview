// Interviewer: You have 2 minutes to solve a frontend problem.

// Task: Build a search filter that dynamically filters a list of products as the user types.

// Me: Challenge accepted.

// 📦 Sample HTML
<input type="text" id="search" placeholder="Search products..." />

<ul id="productList">
  <li>Laptop</li>
  <li>Phone</li>
  <li>Tablet</li>
  <li>Headphones</li>
</ul>

// ⚙️ JavaScript Solution
const searchInput = document.getElementById("search");
const items = document.querySelectorAll("#productList li");

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(value) ? "block" : "none";
  });
});

// 🧠 What I did:
// 1. Grabbed the input field and all list items using DOM selectors.
// 2. Added an input event listener to track every keystroke in real time.
// 3. Converted both user input and product names to lowercase to avoid case issues.
// 4. Checked if each product includes the typed value.
// 5. Showed matching items and hid the rest using style.display.

// ✅ Result:

// As the user types → list updates instantly
// - Only relevant products are visible
// - Clean, fast, and user-friendly behavior

// 🚀 If interviewer pushes further:
// - Add debouncing for performance
// - Highlight matching text
// - Show “No results found” when empty