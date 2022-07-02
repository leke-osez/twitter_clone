import './pageTitle.css';

import React from 'react'

function pageTitle({text, isActive,name}) {
    
  return (
    <div className = 'pageTitle' >
        <p className = {`${isActive? `bold`: ''}`}>{text}</p>
        {isActive ? <div className = 'titleBar'></div>: <div className = 'titleBar hovering'></div>}
    </div>

  )
}

export default pageTitle