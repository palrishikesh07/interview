import React, { useMemo, useState } from 'react'
import EmployeeList from './EmployeeList';
import "./Virtual.css";


const employees = Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    name: `Employee ${index + 1}`,
    // role: ["Deveoper", "Tester", "Tech Lead"][index % 3]
}));



const VirtualReactWindow = () => {
    const [search, setSearch] = useState("");


    const filteredEmployees = useMemo(() => {
        // return employees;
        const query = search.trim().toLowerCase();

        if (!query) return employees;

        // const allFilterEmployee = employees.filter((employee) => employee.name.toLowerCase().includes(query)
        //     || employee.role.toLowerCase().includes(query));


        const allFilterEmployee = employees.filter((employee) => employee.name.toLowerCase().includes(query));

        console.log(allFilterEmployee);

        return allFilterEmployee;
    }, [search]);




    return (
        <>
            <main className='container'>
                <h1>Employee Dashboard</h1>
                <p>Explore 10,000 employee records</p>

                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    type='text'
                    placeholder='Search name or role...' />
                <p>
                    Showing {filteredEmployees.length} employees
                </p>

            </main>
            <main className='container'>


                {
                    filteredEmployees.length > 0 ? (<EmployeeList employees={filteredEmployees} />) : (<p>No Employee Found</p>)
                }

            </main>
        </>
    )
}

export default VirtualReactWindow