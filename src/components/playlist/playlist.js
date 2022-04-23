import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatePlaylist from "./createPlaylist";
import Search from "./search";
import Song from "./song";
import { useSelector } from "react-redux";

const Playlist = () => {

    const accessToken = useSelector((state) => state.token.value);
    const [search, set_search] = useState("");
    const [tracks, set_tracks] = useState([]);
    const [selected, setSelected] = useState([]);
    const [combineTrack, setCombineTrack] = useState([]);

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

      useEffect(() => {
        const handleCombineTrack = tracks.map((item) => ({
          ...item,
          select : selected.find((track) => track === item.uri),
        }));
        setCombineTrack(handleCombineTrack);
      }, [selected, tracks]);

    return (
        <div>
            <CreatePlaylist
                accessToken = {accessToken}
                uriTrack = {selected}
            />
            <Search
                search={search}
                getTracks={getTracks}
                searchChange={searchChange}
            />
            {combineTrack.map((item) => {
            const { name, album, uri, select } = item;
            return (
              <Song key={uri} 
              image={album.images[1].url} 
              title={name} 
              album={album.name} 
              artist={album.artists[0].name}
              handlerSelect={handlerSelect}
              uri={uri}
              select={select}
              />
            );
            })};
        </div>
    );
}

export default Playlist;