import React from 'react'

const NotFound = () => {
    return (
        <>
            <div style={{top:'50%',left:'50%', transform: 'translate(-50%,-50%)', position:'absolute'}}>
                <h1 className='text-center'>404 Error</h1>
                <div className='alert alert-primary bg-primary text-light border border-primary text-center mx-auto'>
                    The page you are looking for does not exist
                </div>
            </div>
        </>
    )
}

export default NotFound