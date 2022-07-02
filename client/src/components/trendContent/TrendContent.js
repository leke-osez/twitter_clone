import MoreHoriz from '@material-ui/icons/MoreHoriz';
import React from 'react'
import './trendContent.css';

function TrendContent() {
  return (
    <div className = 'trendContent'>
        <div className = 'trendContent__header'>
            <p className = 'trendContent__headerText'>Trending in Nigeria</p>
            <MoreHoriz className = 'trendContent__options'/>
        </div>
        <p className = 'trendContent__tag'>Billionaire</p>
        <p className = 'trendContent__tweets'>19K Tweets</p>
    </div>
  )
}

export default TrendContent