import React, { useContext } from 'react';
import { UserContext } from '../App';

const Protected = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    return (
        <div>
            <h2>This is protected page</h2> 
            <p>{loggedInUser.email}</p>
        </div>
    );
};

export default Protected;