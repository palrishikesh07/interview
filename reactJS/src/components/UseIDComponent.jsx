
import React, { useId } from 'react'
export const UseIDComponent = () => {
    const id = useId(); //React 18
    return (
        <>
            <label htmlFor={id}>Name:</label>
            <input id={id} type='text' />
        </>
    )
}
