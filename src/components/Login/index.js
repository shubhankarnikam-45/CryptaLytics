import { Box, Button, TextField, useAutocomplete } from '@mui/material'
import React, { useState } from 'react'
// import { useTheme } from '../Constext/themeContext';
// import { auth } from '../firebaseConfig';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';
import errorMapping from '../../functions/errorMapping';
import { toast } from 'react-toastify';
// import errorMapping from '../Utils/errorMapping';


const LoginForm = ({ handleClose, setLoginDisable }) => {

    //storing the email and password in the state.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");


    //when user click on the submit button.
    function handleSubmit(e) {
        if (!email || !password) {
            alert("fill the fields")
            return;
        }
        console.log("in login button")

        auth.signInWithEmailAndPassword(email, password).then((res) => {
            //when user is login in successfully then.
            //momdal is colse.
            alert("Login Sucessful")

            handleClose();
            setLoginDisable(true);
            toast.success('Login sucessful', {
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
                // console.log("Ef")
                alert(errorMapping[err.code] || "some error occured");
                toast.error(errorMapping[err.code] || "some error occured", {
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
        <div style={{ textAlign: "center" }}>
            <Box
                p={3}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                }}
            >
                <TextField
                    label='Enter Email'
                    type='email'
                    variant='outlined'
                    onChange={(e) => setEmail(e.target.value)}

                    //props to change the label.
                    InputLabelProps={
                        {
                            style: {
                                color: "white"
                            }
                        }
                    }

                    //props to change the input typeing color.
                    inputProps={
                        {
                            style: {
                                color: "white"
                            }
                        }
                    }
                />

                <TextField
                    label='Enter Password'
                    type='password'
                    variant='outlined'
                    onChange={(e) => setPassword(e.target.value)}

                    //props to change the label.
                    InputLabelProps={
                        {
                            style: {
                                color: "white"
                            }
                        }
                    }

                    //props to change the input typeing color.
                    inputProps={
                        {
                            style: {
                                color: "white"
                            }
                        }
                    }
                />
                <Button
                    variant='contained'
                    size='large'
                    style={{
                        backgroundColor: "black",
                        color: "white"
                    }}

                    onClick={handleSubmit}
                >Login</Button>
            </Box>




        </div>
    )
}

export default LoginForm