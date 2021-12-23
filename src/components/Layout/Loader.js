import React from 'react'

const Loader = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 'calc(50% - 7.5rem)',
            left: 'calc(50% - 5rem)',
            height: '10rem',
            width: '10rem',
            transform: 'transform(-50%,-50%)',
        }} className='color-spinner'></div>
    )
}

export default Loader
