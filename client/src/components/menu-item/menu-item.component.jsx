import React from 'react';
import { withRouter } from 'react-router-dom';
//higher order component^^

import './menu-item.styles.scss'

//functional component, does not need to hold state
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
    <div 
    className={`${size} menu-item`}
    onClick={()=> history.push(`${match.url}${linkUrl}`)}
    >
        <div className = 'background-image'
        style={{
            backgroundImage: `url(${imageUrl})`
        }}/>
            <div className='content'>
                <h1 className ='title'>{title.toUpperCase()}</h1>
                <span className='subtitle'>Shop Now</span>
            </div>
    </div>
);
//location, match and history props
export default withRouter(MenuItem);