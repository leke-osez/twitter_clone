import { Settings } from '@material-ui/icons'
import React from 'react'
import './trendTable.css';
import TrendContent from '../trendContent/TrendContent';
import {Link } from 'react-router-dom';

function TrendTable() {
  return(
    <div className = 'trendTable'>
        <div className = 'trendTable__heading'>
            <h2>Trends for you</h2>
            <Settings/>
        </div>
        <div className = 'trendTable__list'>
            <Link to = '/tweets' style = {{textDecoration: 'none'}}>{<TrendContent />} </Link>
            <Link to = '/tweets' style = {{textDecoration: 'none'}}>{<TrendContent />} </Link>
            <Link to = '/tweets' style = {{textDecoration: 'none'}}>{<TrendContent />} </Link>
        </div>
        <p className = 'trendTable__showMore'>Show more</p>
    </div>
  )
}

export default TrendTable