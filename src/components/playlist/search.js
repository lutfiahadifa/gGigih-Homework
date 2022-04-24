import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Search = ({search, getTracks, searchChange}) => {

    return (
        <div className="search-bar">
            <TextField color="success" size="small" value={search} onChange={searchChange} placeholder="Search" />
            <Button color="success" variant="contained" onClick={getTracks} className="button-login">Search</Button>
        </div>
    );
}

export default Search;
