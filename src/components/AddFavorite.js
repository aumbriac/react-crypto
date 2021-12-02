import React from 'react'
import AppContext from '../context/AppContext'
import axios from 'axios'
import formatCryptoForServer from '../functions/formatCryptoForServer'

const AddFavorite = () => {
    const { 
        state,
        favorites,
        setFavorites,
        searchMatches,
        setSearchMatches
    } = React.useContext(AppContext)

    const [, setSearchText] = React.useState('')

    const favoriteInputRef = React.useRef()
    const expandAddFavoriteRef = React.useRef()
    const addFavoriteInputDivRef = React.useRef()

    const expandAddFavorite = () => {
        addFavoriteInputDivRef.current.style.display === 'flex' ? addFavoriteInputDivRef.current.style.display = 'none' : addFavoriteInputDivRef.current.style.display = 'flex'
        expandAddFavoriteRef.current.style.display === 'flex' ? expandAddFavoriteRef.current.style.display = 'none' : expandAddFavoriteRef.current.style.display = 'flex'
        favoriteInputRef.current.focus()
    }

    const submitFavorite = async e => {
        e.preventDefault()
        const input = favoriteInputRef.current.value
        const coin = formatCryptoForServer(input)
        if (favoriteInputRef.current.value === '')
            return
        if (favorites.some(favorite => formatCryptoForServer(favorite.name) === formatCryptoForServer(coin)))
            return alert('Duplicates not allowed')
        try {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}?market_data=true&community_data=false&developer_data=false&sparkline=false`)
            setFavorites([...favorites, res.data])
        } catch (error) {
            alert('Coin not found')
        }
        favoriteInputRef.current.value = ''
    }

    const handleAddFavorite = async coin => {
        try {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}?market_data=true&community_data=false&developer_data=false&sparkline=false`)
            if (favorites.some(favorite => formatCryptoForServer(favorite.name) === formatCryptoForServer(coin)))
                return alert('Duplicates not allowed')  
            setFavorites([...favorites, res.data])
        } catch (error) {
            alert('No data available for this coin currently')
        }
        favoriteInputRef.current.value = ''
    }

    const handleSearchInput = (e) => {
        e.currentTarget.value = e.currentTarget.value.toUpperCase()
        const searchInput = e.currentTarget.value
        if (searchInput === '')
            return setSearchMatches([])
        const results = state.dropdownItems.filter(dropdownItem => {
            return dropdownItem.name.toLowerCase().startsWith(searchInput.toLowerCase())
        })
        setSearchMatches(results)
        setSearchText(searchInput)
    }
    
    return (
        <>
            <div onClick={expandAddFavorite} ref={expandAddFavoriteRef} style={{ display: 'flex' }} className="list-group-item justify-content-between align-items-start">
                <div className="mx-auto">
                    <small className="text-muted material-icons">add</small>
                </div>
            </div>
            <div ref={addFavoriteInputDivRef} style={{ display: 'none' }} className="list-group-item">
                <form style={{ display: 'flex' }} onSubmit={submitFavorite}>
                    <input ref={favoriteInputRef} onInput={e => handleSearchInput(e)} className='form-control bg-dark text-light rounded-0' />
                    <button type="submit" className="btn btn-outline-light align-items-center d-flex rounded-0">
                        <i className="material-icons">add</i>
                    </button>
                    <button type="button" onClick={expandAddFavorite} className="btn btn-outline-secondary align-items-center d-flex rounded-0">
                        <i className="material-icons">expand_less</i>
                    </button>
                </form>
                <div style={{position: 'absolute', marginTop: '2.5rem'}}>
                    <ul style={{ zIndex: '2', width: '300px' }} className={`list-group position-absolute ${document.activeElement === favoriteInputRef.current && searchMatches && searchMatches.length > 0 ? 'scrollable' : ''}`}>
                        {document.activeElement === favoriteInputRef.current && searchMatches && searchMatches.length > 0 &&
                        searchMatches.map((match, idx) => (
                            <li key={idx} onClick={e => handleAddFavorite(formatCryptoForServer(e.currentTarget.textContent))} style={{ minWidth: '200px', background: 'rgba(25,25,25,1)' }} className={`list-group-item text-start`}>
                                {match.name}
                            </li>
                        ))}
                    </ul>                       
                </div>
            </div>
            
        </>
    )
}

export default AddFavorite
