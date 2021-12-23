import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    
    const location = useLocation()

    function checkPath(path){
        if (location.pathname === path)
            return 'active list-group-item'
        return 'list-group-item'
    }
    
    return (
        <nav className='bg-black border border-dark' style={{position:'fixed', top: '0', left: '0'}}>
            <div className="row flex-nowrap">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <span className="pb-3 mb-md-0 mx-auto text-white text-decoration-none">
                        <span className="fs-1 text-warning material-icons d-block">toll</span>
                        <small style={{ letterSpacing: '2px', display: 'block' }} className='mx-auto fw-bolder text-warning'>COIN</small>
                    </span>
                    <div className="mx-auto rounded-top flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <Link to="/">
                            <div className={checkPath('/')}>
                                <i className="material-icons text-primary p-1">dashboard</i>
                            </div>
                        </Link>
                        <Link to="/news">
                            <div className={checkPath('/news')}>
                                <i className="material-icons text-muted p-1">article</i>
                            </div>
                        </Link>
                        <Link to="/chart">
                            <div className={checkPath('/chart')}>
                                <i className="material-icons text-success p-1">bar_chart</i>
                            </div>
                        </Link>
                        <Link to="/trending">
                            <div className={checkPath('/trending')}>
                                <i className="material-icons text-danger p-1">local_fire_department</i>
                            </div>
                        </Link>
                        <Link to="/api">
                            <div className={checkPath('/api')}>
                                <i className="material-icons text-info p-1">api</i>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar