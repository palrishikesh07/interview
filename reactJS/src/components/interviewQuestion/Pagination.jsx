import React, { useState } from 'react'

const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
const Pagination = () => {

    const [currentPage, setCurrentPage] = useState(2);
    const perPage = 10;
    const start = (currentPage - 1) * perPage;
    console.log(start)
    const current = data.slice(start, start + perPage);

    return (
        <>
            <div>Pagination</div>
            {
                current && current.map((pageData) => <p key={pageData}>{pageData}</p>)
            }
            <button onClick={()=>setCurrentPage((currentPage)=>currentPage-1)} disabled={currentPage==1} >Prev</button>
            <button onClick={()=>setCurrentPage((currentPage)=>currentPage+1)} disabled={currentPage == data.length/perPage}>Next</button>
        </>
    )
}

export default Pagination