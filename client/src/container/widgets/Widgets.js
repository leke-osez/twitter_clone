//right layout of the app  view containing trends,news...

import React from 'react';
import './widgets.css' 
import SearchIcon from '@material-ui/icons/Search';
// import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';
import TrendTable from '../../components/trendTable/TrendTable';

function Widgets() {
  return (
    <div className = 'widgets'>
      <div className = 'widgets__inputContainer'>
        <div className = 'widgets__input'>
          <SearchIcon className = 'widgets__searchIcon'/>
          <input placeholder='Search Twitter' type = 'text'/>
        </div>
      </div>
      
      <div className = 'widget__trendTable'>
        <TrendTable/>
      </div>
              

      <div className = 'widgets__widgetContainer'>
        <h2>What's happening </h2>
          {/* <TwitterTweetEmbed tweetId='1491552932759756801'/>
          <TwitterTimelineEmbed
            sourceType='profile'
            screenName='slashML'
            options={{height:400}}
          /> */}
      </div>
    </div>);
}

export default Widgets;
