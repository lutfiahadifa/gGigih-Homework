import { useState, useEffect } from "react";
import axios from "axios";
import CreatePlaylist from "./createPlaylist";
import Search from "./search";
import Song from "./song";
import { useSelector } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

interface tracksInterface { 
  uri: string; 
  album: { 
    name: string; 
    artists: {
      [index: number]: {
        name: string;
      }
    }
    images: { 
      [index: number]: { 
        url: string; 
      }; 
    }; 
  }; 
  name: string; 
  duration_ms: number;
  select: boolean; 
};

const Playlist = () => {

    const accessToken = useSelector((state: any) => state.token.value);
    const [search, set_search] = useState("");
    const [tracks, set_tracks] = useState([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [combineTrack, setCombineTrack] = useState<tracksInterface[]>([]);

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

    const searchChange = (e: any) => {
        set_search(e.target.value);
    };

      const handlerSelect = (uri: string) => {
        const onSelected = selected.find(track => track === uri);
        onSelected ?
        setSelected(selected.filter((track) => track !== uri))
        : setSelected ([...selected, uri]);
        console.log(selected);
      };

      useEffect(() => {
        const handleCombineTrack = tracks.map((item: tracksInterface) => ({
          ...item,
          select : selected.find((track) => track === item.uri) ? true : false,
        }));
        setCombineTrack(handleCombineTrack);
      }, [selected, tracks]);

      const clearSelect = () => {
        setSelected([]);
      };

      const durationTrack = (duration: number) => {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return (
          `${minutes}:${seconds}`
        );
      };

    return (
      <div>
          <AppBar sx={{ bgcolor: "rgb(37, 94, 38)" }} position="static">
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Spotify React
            </Typography>
          </AppBar>
        <div className="create-playlist">
            <CreatePlaylist
              accessToken={accessToken}
              uriTrack={selected}
              clearSelected={clearSelect}
            />
            <div className="search">
              <Search
                search={search}
                getTracks={getTracks}
                searchChange={searchChange}
              />
              {combineTrack.map((item: tracksInterface) => {
              const { name, album, uri, select, duration_ms } = item;
              return (
                <Song key={uri} 
                  image={album.images[1].url} 
                  title={name} 
                  album={album.name} 
                  artist={album.artists[0].name}
                  duration={durationTrack(duration_ms)}
                  Selecthandler={handlerSelect}
                  uri={uri}
                  select={select}
                />
              );
              })}
          </div>
        </div>
      </div>  
    );
};

export default Playlist;
