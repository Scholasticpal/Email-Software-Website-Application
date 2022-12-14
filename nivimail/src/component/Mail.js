import React from 'react';
import Header from './Header';
import './css/Mail.css';
import Sidebar from './Sidebar';
import View from './View';

function Mail() {
  return (
    <div className='mail'>
    <Header/>
    <div className='mailBody'>
      <Sidebar/>
      <View/>
    </div>
    </div>
  )
}

export default Mail