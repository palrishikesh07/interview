// DocumentFragment is a lightweight DOM container
// used to batch DOM updates
// and improve performance by minimizing reflows.

const fragment = document.createDocumentFragment();

for (let i = 1; i <= 5; i++) {
    const li = document.createElement("li");
    li.textContent = "Item " + i;
    fragment.appendChild(li);
}

document.getElementById("list").appendChild(fragment);

// When you add elements one by one directly to the DOM,
// the browser may:
// Recalculate layout (reflow)
// Repaint multiple times
// 👉 This hurts performance.
// DocumentFragment avoids this by batching updates.



/*

What are Web Components?
Web Components are custom HTML elements that you create yourself.
They have their own structure, styling, and behavior.
They are reusable and can be used anywhere in your application.
Similar to React components, but they are a native browser feature (no framework required).

Easy definition:
Web Components = Your own reusable HTML tags.

*/

<html lang="en">
<body>

    <custom-element></custom-element>
    <custom-element></custom-element>
    <custom-element></custom-element> 

    <script>
        class CustomComponent extends HTMLElement {

            connectedCallback() {
                this.innerHTML = `
                    <label>Input</label>
                    <input type="text" placeholder="Enter value" />
                    <br><br>
                `;
            }

        }

        customElements.define("custom-element", CustomComponent);
    </script>

</body>
</html>



// String Example
console.log("hello".toUpperCase()); // HELLO

// ❌ This will throw a SyntaxError
// console.log(10.toString());

// ✅ Method 1: Use two dots
console.log(10..toString()); // "10"

// ✅ Method 2: Wrap the number in parentheses
console.log((10).toString()); // "10"

// ✅ Method 3: Store the number in a variable
let num = 10;
console.log(num.toString()); // "10"

// More Examples
console.log((123).toString());      // "123"
console.log((3.14).toString());     // "3.14"
console.log((100).toFixed(2));      // "100.00"
console.log((10).valueOf());        // 10

// Demonstrating why 10.toString() fails
try {
    eval("10.toString()");
} catch (error) {
    console.log("Error:", error.message);
}












// 10.toString() throws a syntax error because JavaScript parses 10. as a floating-point number literal, 
// so the following . is unexpected. To call a method on a number literal,
//  either wrap the number in parentheses (10).toString() or use two dots 10..toString().
//   Variables like num.toString() don't have this issue because the parser can clearly distinguish 
//   the variable name from property access.