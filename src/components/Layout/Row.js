import React from 'react'

const Row = props => {
    return (
        <div className = "row container-fluid text-center">           
            {props.children}
        </div>
    )
}

export default Row
