import React from 'react';
import './App.css';
import Login from './components/login/login';
import Playlist from './components/playlist/playlist';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  const accessToken = useSelector((state) => state.token.value);

  return (
    <div className='App'>
      <h1>SPOTIFY REACT</h1>
      <Router>
        <Switch>
            <Route exact path="/">
              {!accessToken ? (<Login/>) : (<Redirect to="/create-playlist"/>)}
            </Route>
            <Route path="/create-playlist">
              <Playlist/>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;