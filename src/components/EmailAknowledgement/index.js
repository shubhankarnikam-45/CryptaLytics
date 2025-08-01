import React from 'react'
import "./styles.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import Header from '../Common/Header';
const EmailaKnowledgement = () => {
    const [user, loading] = useAuthState(auth);
    console.log("user", user)
    return (
        <div>
            <Header />
            {user && <h1>{user.email}</h1>}
        </div>
    )
}

export default EmailaKnowledgement