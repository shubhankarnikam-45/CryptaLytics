import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
function Button({ text, outlined }) {


  return (
    <div className={outlined ? "outlined-btn" : 'btn'} >{text}</div>
  )
}

export default Button