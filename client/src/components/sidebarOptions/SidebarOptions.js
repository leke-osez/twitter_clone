import React from 'react';
import './sidebarOptions.css';

function SidebarOptions({active, text, Icon,IconText}) {
  return (
    <div className = {`sidebarOption ${active && 'sidebarOption--active'}`}>
          {Icon? <Icon/> : <p className = 'sidebarOption__iconText'>{IconText}</p>}
         <p className = 'sidebarOption__text'>{text}</p>
    </div>);
}

export default SidebarOptions;
