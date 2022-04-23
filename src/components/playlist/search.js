import React from "react";

const Search = ({search, getTracks, searchChange}) => {

    return (
        <div className="search-bar">
            <input value={search} onChange={searchChange} placeholder="Search" />
            <button onClick={getTracks} className="button-login">Search</button>
        </div>
    );
}

export default Search;