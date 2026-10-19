import React, { useRef, useState } from 'react'

const RefFoucs = () => {
    const inputRef = useRef(null);

    const [arrayValue, _] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

    const handleClickFocus = () => {
        // inputRef.current.focus();
        const inputValue = inputRef.current.value
        const onlyNumber = inputValue.replace(/[^0-9]/g, '')
        // 1 extra quesiton were asked in interview
        const minValue = Math.min(onlyNumber, arrayValue.length);

        for (let i = 0; i < minValue; i++) {
            console.log(arrayValue[i]);
        }


    }

    return (
        <div>
            <h2>Using useRef </h2>
            <input
                type='text'
                ref={inputRef} />
            <br /><br />
            <button onClick={handleClickFocus}>
                Click on Foucs
            </button>
        </div>
    )
}

export default RefFoucs