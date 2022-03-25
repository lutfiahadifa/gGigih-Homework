import './App.css';

import Album from "./components/album";
import Artist from "./components/artist";
import Title from "./components/title";
import AlbumCover from './components/image';
import Button from './components/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Playlist</h1>
      </header>
      <div className="Song-playlist">
        <AlbumCover/>
        <Title/>
        <Album/>
        <Artist/>
        <Button/>
      </div>
    </div>
  );
}

export default App;