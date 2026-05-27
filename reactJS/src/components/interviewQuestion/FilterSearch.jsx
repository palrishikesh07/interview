// show static student data of , Name , roll number and department, there should be a filter on name and drop down for department 
import React, { useState, useEffect, useMemo } from 'react';
const userData = [
    { name: 'first Name', roll_number: 1, department: 'science' },
    { name: 'second Name', roll_number: 2, department: 'commerce' },
    { name: 'third Name', roll_number: 3, department: 'IT' },
    { name: 'Fourth Name', roll_number: 4, department: 'IT' },
];

// Basic apporach done in interview 
// export const FilterSearch = () => {
//     const [data, setData] = useState([]); 
//     const [department, setDepartment] = useState();

//     useEffect(() => {
//         setData(userData);
//         const deparment = userData.map((user) => user.department);
//         console.log(deparment);
//         setDepartment([...new Set(deparment)])
//     }, []);
//     const selectOption = (e) => {
//         console.log(e.target.value)
//         const latestUserData = userData.filter((data) => data.department.includes(e.target.value));
//         setData(latestUserData);
//     }
//     const filterHandler = (name) => {
//         console.log(name);
//         const latestUserData = userData.filter((data) => data.name.includes(name));
//         setData(latestUserData);
//     };
//     return (<>
//         <input onChange={(e) => filterHandler(e.target.value)} type="text" placeholder="Enter Name" />
//         <select onChange={selectOption}>
//             <option value="">All Department</option>
//             {department && department.map((dept) => (<option value={dept}> {dept} </option>))}
//         </select>
//         <table border="2">
//             <tr> <td>Roll Number</td>
//                 <td>Name</td>
//                 <td>Department</td>
//             </tr>
//             {data && data.map((user) => (
//                 <tr> <td>{user.roll_number}</td>
//                     <td>{user.name}</td>
//                     <td>{user.department}</td>
//                 </tr>
//             ))
//             }
//         </table> </>);
// }

export const FilterSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    // ✅ unique departments
    const departments = useMemo(() => {
        return [...new Set(userData.map((user) => user.department))];
    }, [])
    // ✅ filtered data based on search term and selected department
    const filteredData = useMemo(() => {

        return userData.filter((user) => {

            // 👉 Step 1: Normalize values (avoid case issues)
            const userName = user.name.toLowerCase();
            const searchValue = searchTerm.toLowerCase();

            // 👉 Step 2: Check name match
            const matchesSearchTerm = userName.includes(searchValue);

            // 👉 Step 3: Check department match
            let matchesDepartment = true;

            if (selectedDepartment) {
                matchesDepartment = user.department === selectedDepartment;
            }

            // 👉 Step 4: Debug logs (clear visibility)
            console.log({
                name: user.name,
                matchesSearchTerm,
                matchesDepartment
            });

            // 👉 Step 5: Final condition
            return matchesSearchTerm && matchesDepartment;

        });

    }, [searchTerm, selectedDepartment]);

    return (
        <>
            <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="">All Department</option>
                {departments.map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>

            <table border="2">
                <thead>
                    <tr>
                        <th>Roll Number</th>
                        <th>Name</th>
                        <th>Department</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredData.map((user) => (
                        <tr key={user.roll_number}>
                            <td>{user.roll_number}</td>
                            <td>{user.name}</td>
                            <td>{user.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}