import React from 'react'
import Column from '../components/Layout/Column'
import Row from '../components/Layout/Row'
import PriceInfo from '../components/PriceInfo'
import PriceChart from '../components/PriceChart'
import Loader from '../components/Layout/Loader'
import AppContext from '../context/AppContext'
import NewsList from '../components/NewsList'
import TrendingAndFavorites from '../components/TrendingAndFavorites'
import Form from '../components/Form'
import thousandsFormat from '../functions/thousandsFormat'
import DescriptionAndMetrics from '../components/DescriptionAndMetrics'
import PopularSymbols from '../components/PopularSymbols'

const Dashboard = () => {

    const { state, loading } = React.useContext(AppContext)

    return (
        <>
            {loading ?
            
            <Loader />
            
            :

            <div className='mt-3'>
                <Row>
                    <Column cols='9'>
                        <PriceInfo />
                        <PopularSymbols />
                    </Column>
                    <Column cols='3'>
                        <Form />
                    </Column>
                </Row>
                <div className="mt-3">
                    <Row>
                        <Column cols="3">
                            <TrendingAndFavorites />
                        </Column>
                        <Column cols='5'>
                        <div className="mx-auto border border-dark rounded bg-black">
                                    {state.coin.market_data && 
                                        <div className="small">
                                            <span className="fw-bold">{state.coin.symbol.toUpperCase()}</span>
                                            <span className="ms-2 text-light fw-light">&#36;{thousandsFormat(state.coin.market_data.current_price.usd.toFixed(2))}</span>
                                        </div>
                                    }
                                <div className="position-relative">
                                    <PriceChart />
                                    <span style={{marginTop: '-1.333rem'}} className='position-absolute top-0 start-0 ps-2 small text-secondary'>
                                        {state.days === 1 || state.days === 365 || state.days === 30 || state.days === 7 ? 'past' : state.days === 3000 ? '' : `past ${state.days}`}&nbsp;
                                        {state.days === 1 
                                            ? 'day' 
                                            : 
                                        state.days === 3000 ? 'max' : state.days === 365 ? 'year' : state.days === 30 ? 'month' : state.days === 7 ? 'week' : 'days'
                                        }
                                    </span>
                                </div>
                                <DescriptionAndMetrics />
                            </div>
                        </Column>
                        <Column cols='4'>
                            <div style={{height: 'calc(100vh - 9rem)', overflow: 'scroll', border: '1px solid #333'}}>
                                <NewsList />
                            </div>
                        </Column>
                    </Row>
                </div>
            </div>}
        </>
    )
}

export default Dashboard
