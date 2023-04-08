import React from 'react'
import './Header.css';

function Header(props) {
  return (
    <div className='header_main_wrapper'>
        <div className='header_left_wrapper'>
            <div className='header_content'>Image Hosting - {props.page}</div>
        </div>
    </div>
  )
}

export default Header