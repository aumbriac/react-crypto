import React from 'react'
import PriceChart from '../components/PriceChart'
import Row from '../components/Layout/Row'
import Column from '../components/Layout/Column'
import PriceInfo from '../components/PriceInfo'
import Form from '../components/Form'

const Chart = () => {
    return (
        <>
        <div className="mt-3">
                <Row>
                    <Column cols="9">
                        <PriceInfo />
                    </Column>
                    <Column cols="3">
                        <Form />
                    </Column>
                </Row>
                <div style={{position: 'absolute', bottom: '0', width: 'calc(100% - 76px)'}}>
                    <PriceChart />
                </div>
            </div>
        </>
    )
}

export default Chart
