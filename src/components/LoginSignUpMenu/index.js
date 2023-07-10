import React, { useRef, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import Modal from '@mui/material/Modal';
import LoginForm from '../Login';
import SignupForm from '../Signup';
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { toast } from 'react-toastify';
import errorMapping from '../../functions/errorMapping';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import Button from '../Common/Button';
// import { Logout } from '@mui/icons-material';
const LoginSignUpMenu = () => {
    //getting the user.
    //here we use the `useAuthState()` hook provided by the react-firebase-hook.
    //this change when the user is change or any rendering.
    const [user] = useAuthState(auth);
    //use for naviage: 



    const [loginDisable, setLoginDisable] = useState(false);
    console.log("ld", loginDisable)
    //state when user click on the accoount-icon then the `modale` is come in picture.
    const [open, setOpen] = useState(false);

    //state for changing the `value` in tabs componenr.
    const [value, setValue] = useState(0);

    //provided by the `react-router-dom`
    const navigate = useNavigate();

    //when user click on the right-icon button thne this function is triggered.
    function handleClick() {
        // if (user) {
        //     navigate("/user");
        // }

        console.log("s")
        setOpen(true);
    }

    //when modal is open=true then user click on the screen.
    function handleClose() {
        setOpen(false);


    }


    //function to change the `value`.
    function handleValueChange(e, v) {
        setValue(v);
    }

    //creating instance of GoogleAuthProvider.

    const googleProvider = new GoogleAuthProvider();

    //when user click on button of login with `google`.
    const handleGoogleAuthClick = (e) => {
        console.log("google aut ")
        signInWithPopup(auth, googleProvider).then((res) => {
            console.log("g res", res)
            toast.sucess("google login successful", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            //when user is login in successfully then.
            //momdal is colse.
            handleClose();
        }).catch((err) => {
            toast.error([err.code] || "login with google is failed", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })

        //when user click on the logout icon.
        // const logOut = () => {
        //     console.log("log out")
        // }

    }

    //when user click on the logout icon then this function is run.
    function logOutFn() {
        setLoginDisable(false);
        auth.signOut().then((res) => {
            alert("log out successfully !")
            toast.success("Log Out Sucessfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
            .catch((err) => {
                toast.error("not able to log out", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }
    return (
        <div>

            <div>
                {!user ? (<div style={loginDisable ? { display: "none" } : { display: "block" }} onClick={handleClick} >
                    <Button text={"Login"} outlined={true} />
                </div>) : (<div onClick={logOutFn} >
                    <Button text={"Log Out"} outlined={true} />
                </div>)}
            </div>


            {/* <LoginForm onClick={handleClick} /> */}

            <Modal
                open={open}
                //state which colse the modal when user click on the screen.
                onClose={handleClose}

                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div style={{ width: "400px", textAlign: "center" }}>
                    <AppBar position='static' style={{ background: "transparent" }}>
                        <Tabs
                            variant='fullWidth'
                            value={value}
                            onChange={handleValueChange}
                        >
                            <Tab label='login' style={{ color: "white" }}></Tab>
                            <Tab label="sign-up" style={{ color: "white" }}></Tab>
                        </Tabs>
                    </AppBar>



                    {value === 0 && <LoginForm handleClose={handleClose} setLoginDisable={setLoginDisable} />}
                    {value === 1 && <SignupForm handleClose={handleClose} />}

                    {/* <Box>
                        <span>OR</span>
                        <GoogleButton style={{ width: "88%", margin: 'auto', marginTop: "13px" }}
                            onClick={handleGoogleAuthClick}
                        />
                    </Box> */}
                </div>
            </Modal>
        </div >

    )
}

export default LoginSignUpMenu