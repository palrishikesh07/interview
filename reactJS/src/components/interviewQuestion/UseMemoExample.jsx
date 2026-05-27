import React, { useMemo } from 'react'

const UseMemoExample = () => {
    const oddNumbers = useMemo(() => {
        console.log("Calculating odd numbers...");
        const numbers = [];
        for (let i = 1; i <= 200; i += 2) {
            numbers.push(i);
        }
        return numbers;
    }, [])

    return (
        <>
            <div>UseMemoExample</div>
            {
                oddNumbers.join(", ")
            }
        </>
    )
}
export default UseMemoExample