import React, {useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tabs, Tab, Box } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useTheme } from '../context/ThemeContext';
import GoogleButton from 'react-google-button'
import {signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';

const AccountCircle = () => {

    const [open , setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const {theme} =  useTheme();

    const navigate = useNavigate();
    const [user] = useAuthState(auth); //this ensure us to give details and verify that account is logged in then only logout
    //  work this return us a array and we have to destructure it

    const handleModalOpen = () => {
        if(user){
            //if user present navigate to the user page 
               navigate('/user');
        }else{
            setOpen(true);
        }
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleValueChange = (e,v) => {
        setValue(v);
    }

    const logout = ()=> {
        auth.signOut().then((res)=> {
            toast.success('Goggle logout successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "Dark",
                });
        }).catch((err)=>{
            toast.error('Not able logout successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "Dark",
                });
        })
    }
// here we use firebase popup to use google account signIn and login  we use googleProvider and auth then everything is handled
//by firebase itself we use toast to show errors and success 
    const googleProvider= new GoogleAuthProvider();
    const handleGoogleSignIn=()=>{
        signInWithPopup(auth,googleProvider).then((res)=>{
            toast.success('Goggle login successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "Dark",
                });
                handleClose();
        }).catch((err)=>{
            toast.error(errorMapping[err.code] || 'Not able to use google Authentication', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "Dark",
                });
        })
    }

  return (
    <div><AccountCircleIcon onClick ={handleModalOpen}/>

    {user && <LogoutIcon onClick = {logout}/>}

    {/* here all of these modals appbar tabs tab box are from material ui npm and we have to go through documentation
    but basic gist is easy to understand we use some in line css for better looks */}
    <Modal 
    open = {open}
    onClose = {handleClose}
    style={{
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',

    }}
    >
      <div style={{width : '400px', textAlign : "center"}}>
       <AppBar position='static' style={{background : 'transparent'}}>
        <Tabs value={value} onChange={handleValueChange} variant='fullWidth'>
            <Tab label='login' style={{color : theme.textColor}}></Tab>
            <Tab label='signup' style={{color : theme.textColor}}></Tab>
        </Tabs>
       </AppBar>
       {value === 0  && <LoginForm handleClose={handleClose}/>}
       {value === 1  && <SignupForm handleClose={handleClose}/>}
       
       <box>
        <span>OR</span>
        <GoogleButton
            style={{width:'100%', marginTop: '12px'}}
         onClick={handleGoogleSignIn}
        />
       </box>

       </div>
    </Modal>
    
    
    </div>
  )
}

export default AccountCircle