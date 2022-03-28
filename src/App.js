import './App.css';
import Song from "./components/song";
import data from "./data";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Playlist</h1>
      </header>
      <div>
        {data.map((song) => <Song key={song.id} image={song.album.images[1].url} title={song.name} album={song.album.name} artist={song.album.artists[0].name}/>)}
      </div>
    </div>
  );
}

export default App;