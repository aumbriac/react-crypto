import React from 'react'
import AppContext from '../context/AppContext'
import Form from '../components/Form'
import PriceInfo from '../components/PriceInfo'
import PriceChart from '../components/PriceChart'
import parseFirstSentence from '../functions/parseFirstSentence'
import stripTags from '../functions/stripTags'

const API = () => {
    const { state } = React.useContext(AppContext)
    React.useEffect(() => {
        console.log(state)
    }, [state])
    return (
        <>
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

            {state.coin.description.en
                ?
                <div className='text-light text-center w-50 mb-3 mx-auto'>
                    <div className="lead fw-bolder mb-1">
                        {state.coin.name}
                    </div>
                    {parseFirstSentence(stripTags(state.coin.description.en))}
                    <a className="small d-block mb-2 mt-1 text-center" style={{ wordBreak: 'break-all' }} href={state.coin.links.homepage[0]}>{state.coin.links.homepage[0]}</a>
                </div>
                :
                <div className="text-muted">No description available</div>
            }  
            <div className="row mx-auto">
                    {state.coin && 
                        Object.keys(state.coin).map((val, idx) => (
                            <React.Fragment key={idx}>
                                {typeof state.coin[val] !== 'object' && state.coin[val] !== '' &&
                                    <div className='col-3 mb-3'>
                                        <div className='card bg-black d-block mx-auto'>
                                            <div className='badge bg-black d-block'>{val.replaceAll('_', ' ')}</div>
                                            <h3 className='small text-center text-primary fw-bolder'>{state.coin[val]}</h3>
                                        </div>
                                    </div>
                                }
                            </React.Fragment>
                    ))}
            </div>
        </>
    )
}

export default API
