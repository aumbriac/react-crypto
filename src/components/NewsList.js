import React from 'react'
import AppContext from '../context/AppContext'
import stripURL from '../functions/stripURL'
import parseURL from '../functions/parseURL'

const NewsList = () => {
    
    const { state } = React.useContext(AppContext) 

    return (
        state.news.length > 0 &&
            state.news.map((article, idx) => (
                <div key={idx} className="list-group-item list-group-item-action text-start bg-dark rounded">
                    <div className="d-flex align-items-center justify-content-start mt-0 bg-black p-2" style={{overflow: 'hidden', wordBreak: 'break-word'}}>
                        <div className="me-3 text-center rounded bg-black pb-3">
                            <img alt={article.project.name} style={{ maxWidth: '100px', maxHeight: '100px' }} className="p-2 img-fluid" src={article.project.image.large} />
                            <div className="me-1 small fw-bolder">
                                {article.project.name.toUpperCase()}
                            </div>

                            <div className="me-1 d-block text-secondary">
                                {article.project.symbol !== undefined ? article.project.symbol.toUpperCase() : ''}
                            </div>
                        </div>
                        <p style={{ letterSpacing: '1px' }} className="small mb-1">
                            <span className="fw-light">{new Date(article.created_at).toLocaleTimeString()} {new Date(article.created_at).toLocaleDateString()}</span>
                            &nbsp;-&nbsp;{stripURL(article.description)}
                            <br />
                            <a href={parseURL(article.description)}>{parseURL(article.description)}</a><br />
                        </p>
                    </div>
                </div>
            )
        )
    )
}

export default NewsList