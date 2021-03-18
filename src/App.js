import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalProvider } from "./AuthState/GlobalContext";
import Cases from "./Components/Cases";
import HomeView from "./Components/HomeView";

import Login from "./Components/Login";
import NavBar from "./Components/NavBar/NavBar";
import Reports from "./Components/Reports";

import SignUp from "./Components/Signup";

function App() {
  return (
    <div>
      <GlobalProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/login" component={Login} />
            <Route path="/signUP" component={SignUp} />
            <Route path="/report" component={Reports} />
            <Route exact path="/case" component={Cases} />
          </Switch>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
