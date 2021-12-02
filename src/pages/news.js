import React from 'react'
import AppContext from '../context/AppContext'
import Row from '../components/Layout/Row'
import PriceInfo from '../components/PriceInfo'
import PriceChart from '../components/PriceChart'
import Loader from '../components/Layout/Loader'
import NewsList from '../components/NewsList'

const News = () => {
    const { loading } = React.useContext(AppContext)

     return (
        <div className='container mt-3'>
        {loading ?   
            <Loader />
            :
            <Row>
                <div style={{
                    background: '#000',
                    display: 'flex',
                    position: 'sticky',
                    top: '0',
                    zIndex: '9',
                    justifyContent: 'center',
                }}>
                    <PriceInfo />
                    <div style={{ marginLeft: '1rem', width: "200px", borderLeft: '1px solid #333', paddingLeft: '1rem' }}>
                        <PriceChart />
                    </div>
                </div>
                <div style={{width: '100%', margin: 'auto'}}>
                    <NewsList />
                </div>
            </Row>}
        </div>
    )
}

export default News
