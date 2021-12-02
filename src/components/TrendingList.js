import React from 'react'
import AppContext from '../context/AppContext'

const TrendingList = () => {
    const { state, getChart } = React.useContext(AppContext)

    return (
        <>
            {state.trending.length > 0 && state.coin.id &&
                state.trending.map((trending, idx) => (
                    <div key={idx}
                        onClick={e => getChart(trending.item.id)} 
                        className={`list-group-item px-4 d-flex justify-content-between align-items-center 
                            ${trending.item.name.toUpperCase() === state.coin.name.toUpperCase()
                                ? 'bg-dark' 
                                : 'bg-black'}`
                            }>
                        <img alt={trending.item.name} style={{ marginTop: '.333rem' }} src={trending.item.small} className="img-fluid rounded border border-secondary bg-light" />
                        <div className="ms-2 me-auto text-start">
                            <div className="fw-bold">{trending.item.symbol}</div>
                            <small className="text-muted">{trending.item.name}</small>
                        </div>
                        <small className='fw-light'>&#36;{(trending.item.price_btc * state.priceBTC).toFixed(2)}</small>
                    </div>
                ))
            }
        </>
    )
}

export default TrendingList