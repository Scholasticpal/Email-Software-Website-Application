import React from 'react';
import Header from './Header';
import './css/Mail.css';
import Sidebar from './Sidebar';
import View from './View';
import Widget from './Widget';

function Mail() {
  return (
    <div className='mail'>
    <Header/>
    <div className='mailBody'>
      <Sidebar/>
      <View/>
      <Widget/>
    </div>
    </div>
  )
}

export default Mail