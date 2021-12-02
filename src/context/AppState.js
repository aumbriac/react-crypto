import React from 'react'
import AppContext from './AppContext'
import AppReducer from './AppReducer'
import axios from 'axios'
import useLocalStorageState from 'use-local-storage-state'
import Loader from '../components/Layout/Loader'
import usePrevious from '../hooks/usePrevious'
import checkFloat from '../functions/checkFloat'
import formatCryptoForServer from '../functions/formatCryptoForServer'
import formatCryptoForClient from '../functions/formatCryptoForClient'

const AppState = props => {
    
    const initialState = {
        chart: {},
        coin: {},
        trending: [],
        favorites: [],
        news: [],
        popularSymbols: [],
        dropdownItems: [],
        priceBTC: 0,
        days: 1
    }

    const [state, dispatch] = React.useReducer(AppReducer, initialState)
    const [favorites, setFavorites] = useLocalStorageState('__coin_faves', [])
    const [storageCoin, setStorageCoin] = useLocalStorageState('__coin_coin', '')
    const [tab, setTab] = useLocalStorageState('__coin_tab', 'trending')
    const [searchMatches, setSearchMatches] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const prevCoin = usePrevious(state.coin.id)

    const getDropdownItems = async () => {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`)
        dispatch({
            type: 'GET_DROPDOWN_LIST',
            payload: res.data
        })
    }

    const getPriceBTC = async () => {
        const res = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
        )
        dispatch({
            type: 'GET_PRICE_BTC',
            payload: res.data.bitcoin.usd
        })
    }

    const getPopularSymbols = async () => {
        const res = await axios.get(
            `https://api.coingecko.com/api/v3/exchanges/gdax/tickers`
        )
        dispatch({
            type: 'GET_POPULAR_SYMBOLS',
            payload: [res.data.tickers]
        })
    }
    
    const updateDays = async days => {
        dispatch({
            type: 'UPDATE_DAYS',
            payload: days
        })
    }

    const getNews = async () => {
        const res = await axios.get(
            `https://api.coingecko.com/api/v3/status_updates`
        )
        dispatch({
            type: 'GET_NEWS',
            payload: res.data.status_updates
        })
    }  

    const getTrending = async () => {
        const res = await axios.get(
            `https://api.coingecko.com/api/v3/search/trending`
        )
        dispatch({
            type: 'GET_TRENDING_DATA',
            payload: res.data.coins
        })
    }

    const getChart = async coin => {
        setLoading(true)
        if (!coin)
            return
        coin = formatCryptoForServer(coin)
        try {
            const res = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${state.days}`
            )
            if (res.data.prices.length < 20) {
                setLoading(false)
                if (prevCoin === undefined){
                    setStorageCoin('bitcoin')
                    getChart('bitcoin')
                }
                getChart(prevCoin)
                return alert('Not enough chart data for this coin')
            }
            const volume = res.data.total_volumes.map(obj => obj[1])
            const totalVolume = volume.reduce((a, b) => a + b)
            const times = res.data.prices.map(obj => obj[0])
            const prices = res.data.prices.map(obj => obj[1])
            const firstPrice = Array.from(prices)[0]
            const lowPrice = Math.min.apply(Math, prices)
            const highPrice = Math.max.apply(Math, prices)
            const currentPrice = parseFloat(prices[prices.length - 1])
            
            var color
            if (firstPrice > currentPrice)
                color = 'red'
            else
                color = 'green'

            dispatch({
                type: 'GET_CHART_DATA',
                payload: {
                    volume: volume,
                    totalVolume: totalVolume,
                    times: times,
                    prices: prices,
                    lowPrice: checkFloat(lowPrice),
                    highPrice: checkFloat(highPrice),
                    priceDiff: checkFloat((parseFloat(currentPrice) - parseFloat(firstPrice))),
                    color: color
                }
            })
            const coinData = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${coin}`
            )
            dispatch({
                type: 'GET_COIN',
                payload: coinData.data
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            getChart(prevCoin)
            alert(`Chart data not available for ${formatCryptoForClient(coin)}`)
        }
    }
    
    const fetchAllData = () => {
        let coin
        if (state.coin.id && storageCoin === ''){
            coin = formatCryptoForServer(state.coin.name)
        } else if (storageCoin !== '') {
            coin = storageCoin
        } else {
            coin = 'bitcoin'
            setStorageCoin(coin)
        }
        getChart(coin)
        getNews()
        getTrending()
        getPriceBTC()
        getPopularSymbols()
        getDropdownItems()
    }

    React.useEffect(() => {
        window.addEventListener('click', () => {
            setSearchMatches([])
        })
        fetchAllData()
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        getChart(state.coin.id)
        // eslint-disable-next-line
    }, [state.days])

    return (
        <>
            {loading 
                ? 
            <Loader />
                :
            <AppContext.Provider value={{
                getChart,
                favorites,
                setFavorites,
                storageCoin,
                setStorageCoin,
                state,
                setLoading,
                tab,
                setTab,
                updateDays,
                searchMatches,
                setSearchMatches,
                
            }}>
                {props.children}
            </AppContext.Provider>}
        </>
    )
}

export default AppState