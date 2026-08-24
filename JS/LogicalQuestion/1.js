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
function getByEmail(arraylist){
    const groupByEmail = arraylist.reduce((acc,value)=>{
        const emailDomain = value?.email?.split('@')[1];
        if(!acc[emailDomain])
            acc[emailDomain]=[]; // assing empty

        acc[emailDomain].push(value);

        return acc;
    },{})

    return groupByEmail;
}

// console.log("Group by email ",getByEmail(arraylist));



// Find Manager of all employees
function findManagerDetail(manageId){
    const manager = arraylist.find((detail)=>detail.id == manageId);
    return manager ? manager.name : null;
}

function getEmployeeWithManager(arraylist){

    const employeeDetails = arraylist.map((employee)=>{
        return {
            ...employee,
            manager_name:findManagerDetail(employee.manager_id)
        }
    });

    return employeeDetails;

}

console.log("getEmployeeWithManager ",getEmployeeWithManager(arraylist));


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

console.log("isValuePresent: ", isValuePresent(user, 'BTM'));


const inventory = [
    { name: "asparagus", type: "vegetables", quantity: 5 },
    { name: "bananas", type: "fruit", quantity: 23 },
    { name: "goat", type: "meat", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 },
    { name: "fish", type: "meat", quantity: 22 },
];

const result = Object.groupBy(inventory, ({ type }) => type);
// const result = Object.groupBy(inventory,({quantity}) => quantity);

console.log("result:", result);

const resultQuantity = inventory.reduce((acc,value)=>{
    const quantity = value?.quantity;
    if(!acc[quantity]){
        acc[quantity]=[];
    }
    acc[quantity].push(value);
    return acc;
},{})
console.log("resultQuantity:", resultQuantity);


// const normalResult = Object.assign({}, { name: "Rishi" });
// console.log("normalResult: ", normalResult);

