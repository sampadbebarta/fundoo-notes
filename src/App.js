import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/signIn/Login.jsx'
import RegistrationForm from './pages/signup/RegistrationForm.jsx'
import forgotPass from "./pages/forgotPassword/forgotPass.jsx";
import ResetPass from "./pages/resetPassword/resetPassword.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Login" exact component={Login} />
          <Route path="/RegistrationForm" exact component={RegistrationForm} />
          <Route path="/forgotPass" exact component={forgotPass} />
          <Route path="/resetpassword/:token" exact component={ResetPass} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;