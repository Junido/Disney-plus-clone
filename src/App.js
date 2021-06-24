
import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail';
import Login from './components/Login';
import Calculateur from './components/Calculateur';
import Wrapper from "./components/Wrapper";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"; 

function App() {

  return (
    <div className="App">
      <Wrapper>
        <Router>
          <Header  />
          <Switch>
              <Route path="/calculateur">
                <Calculateur />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/detail/:id">
                <Detail />
              </Route>
              <Route path="/">
                <Home />
              </Route>
          </Switch>
        </Router>
      </Wrapper>
    </div>
  );
}

export default App;
