import React from 'react'
import { useParams } from 'react-router'

const ParamsComponent = () => {
    const { id } = useParams();

    return (
        <div>ParamsComponent: {id}</div>
    )
}

export default ParamsComponent