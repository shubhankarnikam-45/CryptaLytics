import React from 'react'
import '../Header/style.css'
import TemporaryDrawer from './drawer'
import Button from '../Button'
import { Link, useNavigate } from 'react-router-dom'
import { ConstructionOutlined } from '@mui/icons-material'
import LoginSignUpMenu from '../../LoginSignUpMenu'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header() {
  const [user] = useAuthState(auth);
  //provided by the `react-router-dom`
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <h1 className='logo'>CryptaLytics<span style={{ color: "var(--blue)" }}>.</span></h1>
      <div className='nav-links'>
        <Link to="/">
          <p className='nav-link'>Home</p>
        </Link>

        {/* <Link to="/compare">
          <p className='nav-link'>Compare</p>
        </Link> */}

        <Link to="/watchlist">
          <p className='nav-link'>Watchlist</p>
        </Link>


        <Link to="dashboard">
          <Button text={"Dashboard"} />
        </Link>

        {/* <Link to='login'>
          <Button text={'Login'} onClick={() => console.log("btn click")} outlined={true} />
        </Link> */}

        <LoginSignUpMenu />
        {user && <Link to='/emailaknowledgement'>
          <AccountCircleIcon />
        </Link>}
        {/* <AccountCircleIcon /> */}

      </div>

      <div className='mobile-drawer'>
        <TemporaryDrawer />
      </div>
    </div>
  )
}

export default Header