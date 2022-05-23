const AppReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CHART_DATA':
            return {
                ...state,
                chart: action.payload
            }
        case 'GET_COIN':
            return {
                ...state,
                coin: action.payload
            }
        case 'GET_PRICE_BTC':
            return {
                ...state,
                priceBTC: action.payload
            }
        case 'GET_COIN_DATA':
            return {
                ...state,
                coin: action.payload
            }
        case 'GET_TRENDING_DATA':
            return {
                ...state,
                trending: action.payload
            }
        case 'GET_FAVORITES': {
            return {
                ...state,
                favorites: action.payload
            }
        }
        case 'UPDATE_DAYS':
            return {
                ...state,
                days: action.payload
            }
        case 'GET_POPULAR_SYMBOLS':
            return {
                ...state,
                popularSymbols: action.payload
            }
        case 'GET_DROPDOWN_LIST':
            return {
                ...state,
                dropdownItems: action.payload
            }
        default:
            return state
    }
}

export default AppReducer