const arraylist = [
    {
        id: 1,
        name: "rishi",
        email: "rishi@gmail.com",
    },
    {
        id: 2,
        name: "raj",
        email: "raj@gmail.com",
        manager_id: 1
    },
    {
        id: 3,
        name: "raju",
        email: "raju@mail.com",
        manager_id: 2
    },
    {
        id: 4,
        name: "rani",
        email: "rani@mail.com",
        manager_id: 3
    }
]

// Group by
const groupByEmailDomain = arraylist.reduce((acc, value) => {
    const domain = value.email.split('@')[1];
    if (!acc[domain]) {
        acc[domain] = []
    }
    acc[domain].push(value);
    return acc;
}, {})

console.log(groupByEmailDomain);


// Find Manager of all employees
const findManger = (employeeId) => {
    const manager = arraylist.find(emp => emp.id === employeeId);
    return manager ? manager.name : null;
}

const employeeWithManager = arraylist.map(emp => {
    return {
        ...emp,
        managerName: findManger(emp.manager_id)
    }
});


console.log('employeeWithManager..', employeeWithManager);

const user = {
    id: 1,
    name: "Rishi",
    address: {
        city: "Bangalore",
        location: {
            pin: 560001,
            area: "BTM"
        }
    },
    skills: {
        backend: {
            primary: "Node.js",
            secondary: "MongoDB"
        },
        frontend: "React"
    }
};


function isValuePresent(obj, value) {
    for (let key in obj) {
        if (obj[key] === value) {
            return true;
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            return isValuePresent(obj[key], value);
        }
    }
    return false;
}

console.log(isValuePresent(user, 'BTM1'));


const inventory = [
    { name: "asparagus", type: "vegetables", quantity: 5 },
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "goat", type: "meat", quantity: 23 },
    { name: "cherries", type: "fruit", quantity: 5 },
    { name: "fish", type: "meat", quantity: 22 },
];

const result = Object.groupBy(inventory, ({ type }) => type);

// console.log("result:", result);
// {

const normalResult = Object.assign({}, { name: "Rishi" });
console.log("normalResult: ", normalResult);

