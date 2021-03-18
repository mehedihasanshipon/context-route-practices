import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Header = () => {
    const [loggedInUser,setLoggedInUser]  =useContext(UserContext) 
    return (
        <div>
            <Link to="/login">Login</Link> <br/>
            <Link to="/protected">Protected</Link><br/>
            <button onClick={()=>setLoggedInUser({})}>Sign Out</button>
            <p>{loggedInUser.email}</p>
        </div>
    );
};

export default Header;