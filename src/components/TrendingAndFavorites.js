import React from 'react'
import AppContext from '../context/AppContext'
import FavoritesList from './FavoritesList'
import TrendingList from "./TrendingList"
import AddFavorite from './AddFavorite'

const TrendingAndFavorites = () => {
    
    const { state, tab, setTab } = React.useContext(AppContext)
    
    return (
        <>
            {state.trending &&
                <div className="list-group border border-dark">
                    <div style={{background: '#111'}} className="card-header">
                        <div className="nav nav-pills d-flex justify-content-center align-items-center">
                            <div className="nav-item text-center">
                                <div onClick={e => setTab('trending')} className="px-5 nav-link rounded-0 rounded-start align-items-center d-flex text-light"
                                style={ 
                                    tab === 'trending' 
                                    ? 
                                        { background: 'rgba(75,0,0,.5)',  } 
                                    : 
                                        { background: '#222'}
                                    }>
                                    <span className="material-icons text-danger">local_fire_department</span> 
                                </div>
                            </div>
                            <div onClick={e => setTab('favorites')} className="nav-item text-center">
                                <div className="px-5 nav-link rounded-0 rounded-end align-items-center d-flex text-light"
                                style={
                                        tab === 'trending' 
                                        ? 
                                            { background: '#222' } 
                                        :
                                            { background: 'rgba(75,0,0,.5)' }
                                        }>
                                    <span className="material-icons text-danger">favorite</span> 
                                </div>
                            </div>
                        </div>
                    </div>
                    {tab === 'trending' ? 
                        <TrendingList /> 
                        : 
                        <>
                            <FavoritesList />
                            <AddFavorite />
                        </>
                    }
                </div>
            }
        </>
    )
}

export default TrendingAndFavorites
