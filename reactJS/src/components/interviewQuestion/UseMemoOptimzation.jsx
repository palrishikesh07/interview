import React, { useEffect, useMemo, useState } from 'react'

const UseMemoOptimzation = () => {
    const [search, setSearch] = useState("");

    const list = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

    const filter = useMemo(()=>{
        console.log("Filtering list...",search);
        const filterList = list.filter(item=>item.toLowerCase().includes(search.toLowerCase()));
        return filterList;
    },[search])
    
    return (
        <>
        <div>UseMemoOptimzation</div>
        <input
        onChange={(e)=>setSearch(e.target.value)}
         type='text'/>
        {
            filter && filter.map((singleData)=><p key={singleData}>{singleData}</p>)
        }
        </>
    )
}

export default UseMemoOptimzation