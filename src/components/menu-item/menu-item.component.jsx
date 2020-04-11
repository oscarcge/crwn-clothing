import React from 'react';
import './menu-item.style.scss';
import { withRouter } from 'react-router-dom';

const smallSize = 'small';

const MenuItem = ({ title, imageUrl, size, history,linkUrl, match }) => (
    
    <div 
        className={`${size !== undefined ? size : smallSize } menu-item`}
        onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
        <div 
            className='background-image'
            style={{
                backgroundImage: `url(${imageUrl})`
            }} 

        />
        <div className="content">
            <h1 className="title">{ title.toUpperCase() }</h1>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>
)

export default withRouter(MenuItem);
