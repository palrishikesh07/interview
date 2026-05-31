## JS/threory/theory1.js
```js
41. What is the DOM?

DOM stands for:
Document Object Model

It is a programming interface that represents an HTML document as a tree structure so JavaScript can access and manipulate webpage elements.

Example HTML:
<h1 id="title">Hello</h1>

JavaScript:
const heading = document.getElementById("title");
console.log(heading);

What You Can Do With DOM:
- Change text/content
- Change styles
- Add/remove elements
- Handle events
- Create interactive webpages

42. How do you select an element by id, class, or tag?

Select by ID
document.getElementById("title");

Select by Class
document.getElementsByClassName("box");

Select by Tag
document.getElementsByTagName("p");

Modern Selectors

querySelector()
Returns first matching element.
document.querySelector(".box");

querySelectorAll()
Returns all matching elements.
document.querySelectorAll(".box");

Interview Tip:
querySelector() is commonly used in modern JavaScript.

43. How do you change element text or HTML?

Change Text
Using textContent
const heading = document.getElementById("title");
heading.textContent = "Welcome";

Change HTML
Using innerHTML
heading.innerHTML = "<span>Hello</span>";

Difference:
Property: textContent → Purpose: Plain text only

Property: innerHTML → Purpose: HTML content

Important:
Avoid unsafe innerHTML with user input because of XSS security risks.

44. How do you add/remove/replace a DOM element?

Create Element
const div = document.createElement("div");
div.textContent = "New Element";

Add Element
document.body.appendChild(div);

Remove Element
div.remove();

Replace Element
const newElement = document.createElement("p");
newElement.textContent = "Updated";
div.replaceWith(newElement);

45. How do you listen to click, keyup, etc.?
Using addEventListener().

Click Event
const button = document.querySelector("button");
button.addEventListener("click", () => {
    console.log("Button clicked");
});

Keyup Event
const input = document.querySelector("input");
input.addEventListener("keyup", () => {
    console.log("Key released");
});

Common Events:
Event: click → Purpose: Mouse click

Event: keyup → Purpose: Key released

Event: keydown → Purpose: Key pressed

Event: submit → Purpose: Form submit

Event: mouseover → Purpose: Mouse hover

46. What is event delegation?
Event delegation is a technique where a parent element handles events for its child elements using event bubbling.

Example:
document.getElementById("list")
.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        console.log(event.target.textContent);
    }
});

Benefits:
- Better performance
- Fewer event listeners
- Works for dynamically added elements

Interview Tip:
Very important concept in frontend interviews.

47. What is event bubbling vs capturing?
Events move through the DOM in two phases.

Event Bubbling
Event travels from child → parent.

Event Capturing
Event travels from parent → child.

Example:
div.addEventListener("click", () => {
    console.log("Div clicked");
});

button.addEventListener("click", () => {
    console.log("Button clicked");
});

If button clicked:
Button clicked
Div clicked

Enable Capturing:
div.addEventListener("click", handler, true);

Default:
JavaScript uses bubbling by default.

48. What is event.target vs event.currentTarget?
Property: event.target → Meaning: Actual clicked element

Property: event.currentTarget → Meaning: Element handling the event

Example:
parent.addEventListener("click", function(event) {
    console.log(event.target);
    console.log(event.currentTarget);
});

Important:
In event delegation, target is very useful.

49. How do you prevent default behavior?
Using:
event.preventDefault();
Example:
Prevent form submission.
form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Form prevented");
});

Common Uses:
- Prevent page reload
- Prevent link navigation
- Custom form handling

50. How do you remove an event listener?
Using:
removeEventListener()
Example:
function handleClick() {
    console.log("Clicked");
}

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

Important:
The same function reference must be used while removing the listener.

Wrong Example:
button.removeEventListener("click", () => {});

This will not work because it creates a new function reference.
```

