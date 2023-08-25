import React from 'react'
import AccountCircle from './AccountCircle'
import Quicklo from '../Quicklo.png';
import Quickna from '../Quickna.png';

const Header = () => {
  return (
    <>
    <div className='header'>
          <div className='logo'>
          {/* <img src={LogoImg} alt='brand-logo' className = 'a' style={{width:'',height:'40px', borderRadius: ''}}/> */}
          <img src={Quicklo} alt='brand-logo' className = 'a' style={{width:'50px',height:'50px', borderRadius: ''}}/>
          <img src={Quickna} alt='brand-name' className = 'a' style={{width:'50px',height:'50px', borderRadius: ''}}/>
          </div>
          <div className='user-icon'>
            <AccountCircle/>
          </div>
    </div>

    </>
  )
}

export default Header