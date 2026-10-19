import React from 'react'
import { FixedSizeList } from 'react-window'

function EmployeeRow({ index, style, data }) {
    const employee = data[index];

    return (
        <div className='employee-row' style={style}>
            <span>{employee.id}</span>
            <span>{employee.name}</span>
            <span>{employee.row}</span>
        </div>
    )
}

const EmployeeList = ({ employees }) => {
    return (
        <FixedSizeList
            height={400}
            width="100%"
            itemCount={employees.length}
            itemSize={52}
            itemData={employees}
            itemKey={(index, data) => data[index].id}
        >
            {EmployeeRow}

        </FixedSizeList>
    )
}

export default EmployeeList