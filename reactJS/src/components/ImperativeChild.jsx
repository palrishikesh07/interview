import React, { forwardRef, useImperativeHandle, useRef } from 'react'

const ImperativeChild =forwardRef(( props,ref ) => {
    const childInputRef = useRef();

    useImperativeHandle(ref, () => (
        {
            focus_custom: () => { // Custom method to focus the input, 
            // purposefully named differently to avoid confusion with 
            // the default focus method
                childInputRef.current.focus();
            },
            clear: () => {
                childInputRef.current.value = "";
            },
        }
    ))
    return (
        <div>
            <h2>ImperativeChild</h2>
            <input
                type="text"
                placeholder='Enter something'
                ref={childInputRef} />
        </div>
    )
})
export default ImperativeChild