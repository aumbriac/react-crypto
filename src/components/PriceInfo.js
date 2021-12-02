import { useContext } from 'react'
import AppContext from '../context/AppContext'
import thousandsFormat from '../functions/thousandsFormat'
import truncateNumber from '../functions/truncateNumber'
import checkFloat from '../functions/checkFloat'

const PriceInfo = () => {

    const { state } = useContext(AppContext)
    
    return (
        <>
        {state.coin.market_data &&
            <div className='rounded d-flex align-items-center px-3 py-1 justify-content-around' style={{background: 'rgba(0,0,0,.777)'}}>
                <span className="d-flex align-items-center">
                    <img alt={state.coin.id} style={{transform: 'scale(.777)'}} src={state.coin.image.small} />
                    <span className="lead text-uppercase fs-1 fw-bolder ms-1 me-3">
                        {state.coin.symbol}
                    </span>
                    <span className="fs-2 fw-lighter me-2">
                        &#36;{thousandsFormat(state.coin.market_data.current_price.usd.toFixed(2))}
                    </span>
                    <span className="me-2 fs-5" style={{ color: `${state.coin.market_data.price_change_24h.toFixed(2) > 0 ? 'green' : 'red'}` }}>
                        <i className="caret material-icons">
                            {`${state.coin.market_data.price_change_24h.toFixed(2) > 0 ? 'arrow_drop_up' : 'arrow_drop_down'}`}
                        </i>
                        <span>&#36;{Math.abs(state.coin.market_data.price_change_24h).toFixed(2)}</span>
                    </span>
                    <span className="me-2 fs-5" style={{ color: `${state.coin.market_data.price_change_24h.toFixed(2) > 0 ? 'green' : 'red'}` }}>
                        <i className="caret material-icons">
                            {`${state.coin.market_data.price_change_24h.toFixed(2) > 0 ? 'arrow_drop_up' : 'arrow_drop_down'}`}
                        </i>
                        <span>{Math.abs(state.coin.market_data.price_change_percentage_24h).toFixed(2)}% </span>
                    </span>
                </span>
                <span className="text-muted ms-2 me-2">
                    low&nbsp; 
                    <span className="fw-light text-light">
                        &#36;{checkFloat(state.coin.market_data.low_24h.usd)}
                    </span>
                </span>
                <span className="text-muted ms-2 me-2">
                    high&nbsp;
                    <span className="fw-light text-light">
                        &#36;{checkFloat(state.coin.market_data.high_24h.usd)}
                    </span>
                </span>
                <span className="text-muted ms-2">
                    vol&nbsp;
                    <span className="fw-light text-light">
                        &#36;{truncateNumber(state.coin.market_data.total_volume.usd)}
                    </span>
                </span>
            </div>}
        </>                   
    )
}

export default PriceInfo
