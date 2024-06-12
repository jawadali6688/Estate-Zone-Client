import React from 'react'
import logoImage from '../../estate zone logo.png'
function Logo() {
  return (
    <div>
      <img src={logoImage} alt="" className= {`w-20 lg:w-28  flex justify-center items-center mx-auto object-cover  hover:translate-y-[-2px] duration-100 `}/>
    </div>
  )
}

export default Logo
