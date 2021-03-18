import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import Protected from './Protected/Protected';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useState } from 'react';
import Header from './Header/Header';
import PrivateRoute from './PrivateRoute/PrivateRoute';
export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
        <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/protected">
            <Protected />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
