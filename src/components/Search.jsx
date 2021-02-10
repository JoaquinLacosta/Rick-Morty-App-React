import React from "react"

const Search = ({ darkMode, search, handleSearch, searchInput }) => (
    <div className="Search">
            <input type="text" 
            className={darkMode ? "Character__Search" : "Character__Search DarkMode"} 
            value={search} 
            onChange={handleSearch}
            ref={searchInput}
            placeholder="Search character"
            />
        </div>
)

export default Search