import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return <div className='header'>
    <h1 className='title'>HN Feed</h1>
    <h2 className='sub'>{'We <3 hacker news!'}</h2>
  </div>
}

export default Header;