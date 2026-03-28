// Removed the duplicate by Id
const employee =
    [{ id: "20", company: "Cisco" },
    { id: "30", company: "TCS" },
    { id: "10", company: "HCL" },
    { id: "20", company: "Cisco" },
    { id: "10", company: "HCL" }];

const newObj = {};
function getUnqiue(arr) {
    for (const emp of employee) {
        newObj[emp.id] = emp
    }
    console.log("newObj: ", newObj)
    return Object.values(newObj)
}
console.log(getUnqiue(employee))



// const simpleEmployee = employee.reduce((acc, emp) => {
//     acc[emp.id] = emp;
//     return acc;
// }, {})
// console.log("simpleEmployee: ", simpleEmployee)
// const uniqueEmployees = Object.values(simpleEmployee);
// console.log("uniqueEmployees: ", uniqueEmployees)



const seen = new Set();

const uniqueEmployeesSet = employee.filter(emp => {
    if (seen.has(emp.id)) return false;
    seen.add(emp.id);
    return true;
})
console.log("seenseen: ", seen)

// console.log("uniqueEmployeesSet: ", uniqueEmployeesSet)

// const mapEmployee = new Map(employee.map(emp => [emp.id, emp]))
// console.log("mapEmployee: ", mapEmployee)
// const uniqueEmployeesMap = [
//     ...mapEmployee.values()
// ]
// console.log("uniqueEmployeesMap: ", uniqueEmployeesMap)