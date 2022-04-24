import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import Playlist from './components/playlist/playlist';

function App() {
  const accessToken = useSelector((state) => state.token.value);
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/">
              {!accessToken ? (<Login />) : (<Redirect to="/create-playlist" />)}
            </Route>
            <Route path="/create-playlist">
              <Playlist />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App
