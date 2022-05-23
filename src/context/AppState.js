import React from 'react'
import AppContext from './AppContext'
import AppReducer from './AppReducer'
import axios from 'axios'
import useLocalStorageState from 'use-local-storage-state'
import Loader from '../components/Layout/Loader'
import usePrevious from '../hooks/usePrevious'
import checkFloat from '../functions/checkFloat'
import formatCryptoForServer from '../functions/formatCryptoForServer'

const AppState = props => {
    const initialState = {
        chart: {},
        coin: {},
        trending: [],
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

    const getPopularSymbols = async () => {
        const res = await axios.get(`https://api.coingecko.com/api/v3/exchanges/gdax/tickers`)
        dispatch({
            type: 'GET_POPULAR_SYMBOLS',
            payload: [res.data.tickers]
        })
    }

    const getTrending = async () => {
        const res = await axios.get(`https://api.coingecko.com/api/v3/search/trending`)
        dispatch({
            type: 'GET_TRENDING_DATA',
            payload: res.data.coins
        })
    }

    // The API relies on the price of Bitcoin to calculate price of cryptocurrencies in trending/favorites
    const getPriceBTC = async () => {
        const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
        dispatch({
            type: 'GET_PRICE_BTC',
            payload: res.data.bitcoin.usd
        })
    }

    const getChart = async coin => {
        setLoading(true)
        if (!coin) return
        coin = formatCryptoForServer(coin)
        try {
            const chartData = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${state.days}`)
            const volume = chartData.data.total_volumes.map(obj => obj[1])
            const totalVolume = volume.reduce((a, b) => a + b)
            const times = chartData.data.prices.map(obj => obj[0])
            const prices = chartData.data.prices.map(obj => obj[1])
            const firstPrice = Array.from(prices)[0]
            const lowPrice = Math.min.apply(Math, prices)
            const highPrice = Math.max.apply(Math, prices)
            const currentPrice = prices[prices.length - 1]
            if (chartData.data.prices.length < 20) {
                if (prevCoin === undefined) {
                    setStorageCoin('bitcoin')
                    getChart('bitcoin')
                }
                getChart(prevCoin)
                setLoading(false)
                return alert('Not enough chart data for this coin')
            }
            var chartColor
            firstPrice > currentPrice ? chartColor = 'red' : chartColor = 'green'
            dispatch({
                type: 'GET_CHART_DATA',
                payload: {
                    volume: volume,
                    totalVolume: totalVolume,
                    times: times,
                    prices: prices,
                    lowPrice: lowPrice,
                    highPrice: highPrice,
                    priceDiff: checkFloat((parseFloat(currentPrice) - parseFloat(firstPrice))),
                    color: chartColor
                }
            })
            const coinData = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`)
            dispatch({
                type: 'GET_COIN',
                payload: coinData.data
            })
            setLoading(false)
        } catch (error) {
            alert(`Chart data not available for this coin`)
            getChart(prevCoin)
            setLoading(false)
        }
    }
    
    const fetchAllData = async () => {
        let coin
        if (state.coin.id && storageCoin === '')
            coin = formatCryptoForServer(state.coin.name)
        else if (storageCoin !== '')
            coin = storageCoin
        else
            setStorageCoin(coin = 'bitcoin')
        await Promise.all([
            getChart(coin),
            getTrending(),
            getPriceBTC(),
            getPopularSymbols(),
            getDropdownItems()
        ])
    }

    const getDropdownItems = async () => {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`)
        dispatch({
            type: 'GET_DROPDOWN_LIST',
            payload: res.data
        })
    }

    const updateDays = async days => {
        dispatch({
            type: 'UPDATE_DAYS',
            payload: days
        })
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
                state,
                getChart,
                favorites,
                setFavorites,
                storageCoin,
                setStorageCoin,
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
