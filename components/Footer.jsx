import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
       <p>© 2023 All rights reserved By DK ROLLINS</p>
       <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
       </p>
    </div>
  )
}

export default Footer