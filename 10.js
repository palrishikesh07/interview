const handler = {
    get: function (target, prop) {
        return prop in target ? target[prop] : `No such property: ${prop}`;
    },
    set: function (target, prop, value) {
        if (prop === 'age' && (typeof value !== 'number' || value <= 0)) {
            throw new Error('Age must be a positive number');
        }
        Reflect.set(target, prop, value); // 
        // target[prop] = value; // Manually setting the value
        return true;
    }
}
const person = { name: "Hrishikesh", age: 18 };

const proxyPerson = new Proxy(person, handler);
console.log(proxyPerson.name);
console.log(proxyPerson.address);// No such property: address
// proxyPerson.age = -1; // Error: Age must be a positive number



function fetchData(callback) {
    console.log('Loading....');

    setTimeout(() => {
        callback(1)
    }, 1500);
}

function displayData(data) {
    console.log('Data:', data);
    console.log('Loading complete!');
}


// fetchData(displayData)


const abortController = new AbortController();

const signal = abortController.signal;

fetch("https://jsonplaceholder.typicode.com/postss", { signal })
    .then((res) => res.json())
    .then((data) => console.log('data:', data))
    .catch((err) => console.log("fethc abort"))


// setTimeout(() => {
//     abortController.abort();
// }, 10);



async function fetchWithRetry(url, retires) {
    for (let i = 0; i < retires; i++) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(`Attempt ${i + 1} failed`);
        }
    }
    throw new Error('All attempts failed');
}

fetchWithRetry('https://jsonplaceholder.typicode.com/post', 3)
    .then((data) => console.log('Data:s', data))
    .catch((error) => console.error('Error:', error));



console.log("This is a log message");
console.warn("This is a warning");
console.error("This is an error");
console.group("Grouped Messages");
console.log("First message in group");
console.log("Second message in group");
console.groupEnd();
console.table([{ name: "Alice", age: 30 }, { name: "Bob", age: 25, salary: 233 }]);

