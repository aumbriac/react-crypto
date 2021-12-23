import React from 'react'
import AppContext from '../context/AppContext'

const PopularSymbols = () => {

    const { state } = React.useContext(AppContext)

    return (
        state.popularSymbols.length > 0 &&
            state.popularSymbols.map((ticker, idx) => (
                <div key={idx} style={{marginTop: '-.75rem', borderTop: '1px solid #222'}} className="w-100 px-4 pb-3 pt-1 d-flex justify-content-between small bg-black">
                    <span className="text-muted">{ticker[0].base}/{ticker[0].target} <span className='text-light me-1 ms-1'>{ticker[0].last}</span></span>
                    <span className="text-muted">{ticker[1].base}/{ticker[1].target} <span className='text-light me-1 ms-1 '> {ticker[1].last}</span> </span>
                    <span className="text-muted">{ticker[2].base}/{ticker[2].target} <span className='text-light me-1 ms-1 '> {ticker[2].last}</span></span>
                    <span className="text-muted">{ticker[3].base}/{ticker[3].target} <span className='text-light me-1 ms-1 '> {ticker[3].last}</span> </span>
                    <span className="text-muted">{ticker[4].base}/{ticker[4].target} <span className='text-light me-1 ms-1 '> {ticker[4].last}</span> </span>
                </div>
            ))
    )
}

export default PopularSymbols
