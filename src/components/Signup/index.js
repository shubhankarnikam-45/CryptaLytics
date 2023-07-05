import { Box, Button, TextField, useAutocomplete } from '@mui/material'
import React, { useState } from 'react'

import { auth } from '../../firebase';
import errorMapping from '../../functions/errorMapping';
import { toast } from 'react-toastify';


const SignupForm = ({ handleClose }) => {

    //storing the email and password & confirm password in the state.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('')
    console.log("email", email)


    //when user click on the submit button.
    function handleSubmit(e) {
        if (!email || !password || !confirmPassword) {

            alert("Fill the fields");

            toast.warning('Fill the fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (password !== confirmPassword) {
            alert("Password Mismatch")
            toast.warning('Password Mismatch', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        //firebase.

        auth.createUserWithEmailAndPassword(email, password).then((res) => {
            //when user is sign up  in successfully then.
            //momdal is colse.
            handleClose();
            alert("Sign Up Sucessfully")
            toast.success('Sign Up Sucessfully ', {
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
                alert(errorMapping[err.code] || 'some error occured')
                toast.error(errorMapping[err.code] || 'some error occured', {
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
        <div style={{ textAlign: 'center' }}>
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

                <TextField
                    label='Enter Confirm Password'
                    type='password'
                    variant='outlined'
                    onChange={(e) => setConfirmPassword(e.target.value)}

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
                >Sign Up</Button>
            </Box>


        </div>
    )
}

export default SignupForm