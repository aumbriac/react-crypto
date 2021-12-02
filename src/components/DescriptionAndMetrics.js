import React from 'react'
import AppContext from '../context/AppContext'
import truncateNumber from '../functions/truncateNumber'
import parseFirstSentence from '../functions/parseFirstSentence'
import stripTags from '../functions/stripTags'

const DescriptionAndMetrics = () => {

    const { state } = React.useContext(AppContext)

    return (
        <>
            {state.coin.description &&
                <>
                    <div className="bg-black rounded-bottom text-center px-3 pb-2">
                        {state.coin.description.en 
                            ?
                            <span className='text-light'>
                                <div className="lead fw-bolder  mb-1">
                                    {state.coin.name}
                                </div>
                                {parseFirstSentence(stripTags(state.coin.description.en))}
                                <a className="small d-block mb-2 mt-1 text-center" style={{ wordBreak: 'break-all' }} href={state.coin.links.homepage[0]}>{state.coin.links.homepage[0]}</a>
                            </span>
                            :
                            <div className="text-muted">No description available</div>
                        }
                    <div style={{fontSize: '.7rem'}} className="row mx-2 my-1 align-items-center justify-content-between">
                        <div className="col">
                            <span className="text-muted">created</span>&nbsp;
                            {state.coin.genesis_date ?? 'unknown'}
                        </div>
                        <div className="col">
                            <span className="text-muted">supply</span>&nbsp;
                            {truncateNumber(state.coin.market_data.circulating_supply !== 0 ? state.coin.market_data.circulating_supply : 'n/a')}
                        </div>
                        <div className="col">
                            <span className="text-muted">sentiment</span>&nbsp;
                            <span className="fw-bolder" style={{ color: `${state.coin.sentiment_votes_up_percentage > 0 ? 'green' : 'red'}` }}>
                                <span>
                                    {state.coin.sentiment_votes_up_percentage > 50 ? '+' : '-'}
                                </span>
                                <span className="fw-light">
                                    {Math.abs(state.coin.sentiment_votes_up_percentage - state.coin.sentiment_votes_down_percentage).toFixed(2)}%
                                </span>
                            </span>
                        </div>
                    </div>
                        <div style={{borderTop: '1px solid #333', margin: '.5rem 0', padding: '.5rem 0'}}>
                            <div className="d-flex">
                                <table className="table table-fluid text-center mb-0">
                                    <tbody>
                                        <tr>
                                            <td className="text-secondary fw-bolder">
                                                <span className="text-light">
                                                    {truncateNumber(state.coin.community_data.reddit_accounts_active_48h)}
                                                </span>
                                            </td>
                                            <td className="text-secondary fw-bolder">
                                                <span className="text-light">
                                                    {truncateNumber(state.coin.community_data.reddit_average_comments_48h)}
                                                </span>
                                            </td>
                                            <td className="text-secondary fw-bolder">
                                                <span className="text-light">
                                                    {truncateNumber(state.coin.community_data.reddit_average_posts_48h)}
                                                </span>
                                            </td>
                                            <td className="text-secondary fw-bolder">
                                                <span className="text-light">
                                                    {truncateNumber(state.coin.community_data.reddit_subscribers)}
                                                </span>
                                            </td>
                                            <td className="text-secondary fw-bolder">
                                                <span className="text-light">
                                                    {truncateNumber(state.coin.community_data.twitter_followers)}
                                                </span>
                                            </td>
                                            <td className="text-secondary fw-bolder">
                                                <span className="text-light">
                                                    {truncateNumber(state.coin.coingecko_score)}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody className="text-muted">
                                        <tr>
                                            <td style={{ fontSize: '.64rem' }}>
                                                Active Reddit Users past 48 hrs
                                            </td>
                                            <td style={{ fontSize: '.64rem' }}>
                                                Avg Reddit Comments past 48 hrs
                                            </td>
                                            <td style={{ fontSize: '.64rem' }}>
                                                Avg Reddit Posts past 48 hrs
                                            </td>
                                            <td style={{ fontSize: '.64rem' }}>
                                                Reddit Subscribers
                                            </td>
                                            <td style={{ fontSize: '.64rem' }}>
                                                Twitter Followers
                                            </td>
                                            <td style={{ fontSize: '.64rem' }}>
                                                Coingecko Score
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default DescriptionAndMetrics
