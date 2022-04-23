import React, { useState, useEffect } from 'react';
import './App.css';
import Song from './components/song';
import Search from './components/search';
import Login from './components/login';
import Playlist from './components/playlist';
import {useSelector, useDispatch} from 'react-redux';
import { setAccessToken } from "./reducer/slice";
import axios from 'axios'; 

function App() {

  const [search, set_search] = useState("");
  const [tracks, set_tracks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [combineTrack, setCombineTrack] = useState([]);
  const accessToken = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  var scope = 'playlist-modify-private user-read-private';
  var redirect_uri = 'http://localhost:3000';
  var spotify_url = 'https://accounts.spotify.com/authorize';
      spotify_url += '?response_type=token';
      spotify_url += '&client_id=' + encodeURIComponent(client_id);
      spotify_url += '&scope=' + encodeURIComponent(scope);
      spotify_url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  
  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const Accesstoken = queryString.get("access_token");
    dispatch(setAccessToken(Accesstoken));
  }, [accessToken]);

  const getTracks = async () => {
    await axios
    .get(
      `https://api.spotify.com/v1/search?q=${search}&type=track&access_token=${accessToken}`
    )
    .then((res) => {
      set_tracks(res.data.tracks.items);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const searchChange = (e) => {
    set_search(e.target.value);
  };

  const handlerSelect = (uri) => {
    const onSelected = selected.find(track => track === uri);
    onSelected ?
    setSelected(selected.filter((track) => track !== uri))
    : setSelected ([...selected, uri]);
    console.log(selected);
  };

  const clearSelect = () => {
    setSelected([]);
  }

  useEffect(() => {
    const handleCombineTrack = tracks.map((item) => ({
      ...item,
      select : selected.find((track) => track === item.uri),
    }));
    setCombineTrack(handleCombineTrack);
  }, [selected, tracks]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
      </header>
      {(!accessToken) && (
        <Login login_url={spotify_url}/>
      )}

      {(accessToken) && (
        <div>
          <Playlist
            accessToken = {accessToken}
            uriTrack = {selected}
            clearSelect = {clearSelect}
          />
          <Search
            search={search}
            getTracks={getTracks}
            searchChange={searchChange}
          />
        </div>
      )}  
      <div>
      {combineTrack.map((item) => {
          const { name, album, select, uri} = item;
          return (
            <Song key={uri} 
            image={album.images[1].url} 
            title={name} 
            album={album.name} 
            artist={album.artists[0].name}
            Selecthandler={handlerSelect}
            uri={uri}
            select={select}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;