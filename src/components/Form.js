import React from 'react'
import AppContext from '../context/AppContext'
import formatCryptoForServer from '../functions/formatCryptoForServer'

const Form = () => {

    const { state, updateDays, getChart, setSearchMatches, searchMatches } = React.useContext(AppContext)

    const [, setSearchText] = React.useState('')

    const formInputRef = React.useRef()

    const handleSubmit = async e => {
        e.preventDefault()
        const coinInput = formatCryptoForServer(formInputRef.current.value)
        getChart(coinInput)
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

    const clickResult = async coin => {
        if (state.coin === coin.toUpperCase())
            return
        try {
            getChart(coin)
        } catch (error) {
            alert(`Data not available for ${coin.toUpperCase()}`)
        }
    }

    return (
        <>
            <form className="btn-group mt-2" onSubmit={handleSubmit} style={{zIndex: '1'}}>
                <input onInput={e => handleSearchInput(e)} ref={formInputRef} className='form-control form-control-lg bg-dark text-light rounded-0' />
                <button className="btn btn-lg btn-outline-light align-items-center d-flex rounded-0 me-3"><i className="material-icons">search</i></button>
                <div className="dropdown">
                    <div className="btn btn-secondary p-3 bg-dark text-light rounded-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="material-icons">calendar_today</i>
                    </div>
                    <ul className="dropdown-menu">
                        <li onClick={e => updateDays(1)} className={`dropdown-item ${state.days === 1 ? 'active' : ''}`}>1 day</li>
                        <li onClick={e => updateDays(7)} className={`dropdown-item ${state.days === 7 ? 'active' : ''}`}>1 week</li>
                        <li onClick={e => updateDays(30)} className={`dropdown-item ${state.days === 30 ? 'active' : ''}`}>1 month</li>
                        <li onClick={e => updateDays(365)} className={`dropdown-item ${state.days === 365 ? 'active' : ''}`}>1 year</li>
                        <li onClick={e => updateDays(3000)} className={`dropdown-item ${state.days === 3000 ? 'active' : ''}`}>Max</li>
                    </ul>
                </div>
            </form>
            <ul style={{ zIndex: '2', width: '300px' }} className={`list-group position-absolute ${document.activeElement === formInputRef.current && searchMatches.length > 0 ? 'scrollable' : ''}`}>
                {document.activeElement === formInputRef.current && searchMatches.length > 0 &&
                    searchMatches.map((match, idx) => (
                        <li key={idx} onClick={e => clickResult(formatCryptoForServer(e.currentTarget.textContent))} style={{ background: 'rgba(25,25,25,1)' }} className={`list-group-item text-start`}>{match.name}</li>
                    ))
                }
            </ul>        
        </>
    )
}

export default Form
