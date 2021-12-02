import React from 'react'

const Column = props => {
    let cols
    if (props.cols !== null)
            cols = '-'+props.cols
        else 
            cols = props.cols
    return (
        <div className={`col${cols}`}>
            {props.children}
        </div>
    )
}

export default Column
