import React from 'react'
import AppContext from '../context/AppContext'
import Row from '../components/Layout/Row'

const Trending = () => {
    const { state } = React.useContext(AppContext)

    return (
        <>
            <Row>
                <h1 className="mt-3">TRENDING <span className="material-icons text-danger fs-1">local_fire_department</span></h1>
                {state.trending &&
                    state.trending.map((coin, idx) => (
                        <div key={idx} className={`col-${idx === 0 ? 0 : 2} mb-3`}>
                            <div className={`p-3`} style={idx === 0 ? { background: 'transparent'} : { background: '#000'}}>
                                <span className={`badge mx-auto mb-2 ${idx === 0 ? 'bg-danger' : 'bg-primary'}`}>#{idx + 1}</span>
                                <img alt={coin.item.name} style={idx === 0 ? { width: '10rem', height: '10rem' } : { width: '5rem', height: '5rem' }} src={coin.item.large} 
                                    className={`bg-light img-fluid img-thumb p-1 rounded mx-auto m-2 d-block ${idx === 0 ? 'pulse' : ''}`} />
                                <small className="text-light fw-bolder">{coin.item.name}</small>
                                <div className="text-muted fw-bold">{coin.item.symbol}</div>
                                <small className='fw-light'>&#36;{(coin.item.price_btc * state.priceBTC).toFixed(8)}</small>
                            </div>
                        </div>
                    ))
                }
            </Row>
        </>
    )
}

export default Trending
