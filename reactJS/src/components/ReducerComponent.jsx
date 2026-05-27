import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        default:
            return state;
    }
}

export function ReducerComponentCounter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <p>{state.count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>
                +
            </button>
            <button onClick={() => dispatch({ type: "decrement" })}>
                -
            </button>
        </>
    );
}