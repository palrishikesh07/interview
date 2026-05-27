import React, { useEffect, useState } from 'react'

const data = ["react", "angular", "vue", "svelte", "ember", "backbone", "preact", "alpinejs", "lit", "solidjs"]

const SearchFilterDebounce = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        // Without debounce
        //  const filter = data.filter((item)=>item.includes(searchTerm));
        // setFilterData(filter);

        // With debounce
        const debounceTimeout = setTimeout(() => {
            const filtered = data.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            console.log("useEffect called with searchTerm:", filtered);
            setFilterData(filtered);
        }, 1000); // Adjust the debounce delay as needed
        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [searchTerm])


    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }
    return (
        <>
            <div>SearchFilterDebounce</div>
            <input
                onChange={handleChange}
                type='text' placeholder='Search query' />

            {
                filterData && (
                    filterData.map(singleData => (
                        <li key={singleData}>{singleData}</li>
                    ))
                )
            }
        </>
    )
}

export default SearchFilterDebounce