import React from 'react'
import AppContext from '../context/AppContext'
import thousandsFormat from '../functions/thousandsFormat'
import arrayMove from '../functions/arrayMove'
import formatCryptoForServer from '../functions/formatCryptoForServer'
import axios from 'axios'

const FavoritesList = () => {
    const { state, getChart, setStorageCoin, favorites, setFavorites } = React.useContext(AppContext)

    const favoriteRefs = React.useRef([])
    const actionsFavoriteRefs = React.useRef([])

    favoriteRefs.current = favorites.map((favorite, idx) => favoriteRefs.current[idx] ?? React.createRef())
    actionsFavoriteRefs.current = favorites.map((favorite, idx) => actionsFavoriteRefs.current[idx] ?? React.createRef())

    const handleDeleteFavorite = idx => {
        const filtered = favorites.filter(favorite => { return formatCryptoForServer(favorite.name) !== formatCryptoForServer(favoriteRefs.current[idx].current.outerText) })
        setFavorites(filtered)
    }

    const handleMoveFavoriteDown = idx => {
        if (idx === favorites.length - 1)
            return
        const moved = arrayMove(favorites, idx, idx + 1)
        setFavorites(moved)
    }

    const handleMoveFavoriteUp = idx => {
        if (idx === 0)
            return
        const moved = arrayMove(favorites, idx, idx - 1)
        setFavorites(moved)
    }

    const handleFavoriteClick = async coin => {
        const res = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${state.days}`
        )
        if (res.data.prices.length < 20)
            return alert('Not enough chart data for this coin')
        getChart(coin)
        setStorageCoin(coin)
    }

    return (
        <>
            {favorites && state.coin.id &&
                favorites.map((favorite, idx) => (
                    <div 
                        key={favorite.id} onClick={() => handleFavoriteClick(favorite.id)}
                        onMouseLeave={() => actionsFavoriteRefs.current[idx].current.style.display = 'none' } 
                        onMouseEnter={() => actionsFavoriteRefs.current[idx].current.style.display = 'block' } 
                        className={`list-group-item px-4 d-flex justify-content-between align-items-center ${formatCryptoForServer(favorite.name) === formatCryptoForServer(state.coin.name) ? 'bg-dark' : 'bg-black'}`}>
                        <img alt={favorite.name} style={{ marginTop: '.333rem' }} src={favorite.image.small} className="img-fluid rounded border border-secondary bg-light" />
                        <div className="ms-2 me-auto text-start">
                            <div className="fw-bold">{favorite.symbol.toUpperCase()}</div>
                            <small ref={favoriteRefs.current[idx]} className="text-muted">{favorite.name}</small>
                        </div>
                        <small className='text-light me-3'>&#36;{thousandsFormat(favorite.market_data.current_price.usd)}</small>
                        <div style={{ display: 'none' }} ref={actionsFavoriteRefs.current[idx]}>
                            <div style={{zIndex: '999'}} onClick={e => e.stopPropagation() & handleMoveFavoriteUp(idx)} className='favorite-action position-absolute end-0 top-0 bg-black material-icons d-block'>arrow_upward</div>
                            <div onClick={e => e.stopPropagation() & handleDeleteFavorite(idx)} className='favorite-action position-absolute end-0 h-100 py-4 top-0 bg-black material-icons d-block'>close</div>
                            <div onClick={e => e.stopPropagation() & handleMoveFavoriteDown(idx)} className='favorite-action bg-black bottom-0 end-0 position-absolute material-icons d-block'>arrow_downward</div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default FavoritesList