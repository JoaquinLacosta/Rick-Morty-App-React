import React, { useState, useReducer, useMemo, useRef, useCallback } from "react"
import "./styles/Characters.css"
import Search from "./Search"
import useCharacters from "../hooks/useCharacter"

const initialState = {
    favorites: [],
}

const favoriteReducer = (state, action) => {
switch(action.type) {
    case "ADD_TO_FAVORITE":
        return{
            ...state,
            favorites: [...state.favorites, action.payload]
       }
    case "REMOVE_FROM_FAVORITES":
        return {
            ...state,
            favorites: [...state.favorites.filter(item => item.id !== action.payload.id)]
        }
    
    default:
        return state
    }
}

const Characters = ({darkMode}) => {
    const [pages, setPages] = useState(1)
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
    const [search, setSearch] = useState("")
    const searchInput = useRef(null);
    const API = `https://rickandmortyapi.com/api/character/?page=${pages}`
    // const API2 = `https://rickandmortyapi.com/api/character/?name=${search}&page=${pages}`

    const characters = useCharacters(API)

    const handleAddFavorite = favorite => {
        dispatch({ type: "ADD_TO_FAVORITE", payload: favorite })
    }

    const handleRemoveFavorite = favorite => {
        dispatch({ type: "REMOVE_FROM_FAVORITES", payload: favorite })
    }

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, [])

    const filteredUsers = useMemo(() => 
        characters.filter(user => {
            return user.name.toLowerCase().includes(search.toLowerCase())
        }),
        [characters, search]
    )

    // const buscarPj = (e) => {
    //     const pj = e.target.value
    //     setSearch(pj)
    // }

    return(
        <div className={darkMode ? "Characters__Container" : "Characters__Container DarkMode"}>
        <Search 
        darkMode={darkMode} 
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
        />
        <h2 className="Section__title">Favorites</h2>
        <div className="Characters">
        {favorites.favorites.map(favorite => (
                <div key={favorite.id} className={darkMode ? "Character__Card" : "Character__Card DarkMode"}>
                    <div className="Character__Img" style={{backgroundImage: `url(${favorite.image})`}}>
                            <h2 className="Character__title DarkMode">{favorite.name}</h2>
                            <ul className="Character__Stats-list DarkMode">
                                <li className="Character__Stats">{(favorite.status.toLowerCase() === "alive" ? <p><span className="Character__Stats-single">Status:</span> {favorite.status} 💚</p> : <p><span className="Character__Stats-single">Status:</span> {favorite.status} 🔴</p>)}</li>
                                <li className="Character__Stats"><p><span className="Character__Stats-single">Gender:</span> {favorite.gender}</p></li>
                                <li className="Character__Stats"><p><span className="Character__Stats-single">Specie:</span> {favorite.species}</p></li>
                                <li className="Character__Stats"><p><span className="Character__Stats-single">Name:</span> {favorite.origin.name}</p></li>
                            </ul>
                    </div>
                    <button className="Eliminate__button" type="button" onClick={() => {handleRemoveFavorite(favorite)}}><i className="far fa-minus-square"></i></button>
                </div>
            ))}
        </div>
        <h2 className="Section__title">Characters</h2>
        <div className="Characters">
            {filteredUsers.map(character => (
                <div key={character.id} className={darkMode ? "Character__Card" : "Character__Card DarkMode"}>
                    <div className="Character__Img" style={{backgroundImage: `url(${character.image})`}}>
                            <h2 className="Character__title DarkMode">{character.name}</h2>
                            <ul className="Character__Stats-list DarkMode">
                                <li className="Character__Stats">{(character.status.toLowerCase() === "alive" ? <p><span className="Character__Stats-single">Status:</span> {character.status} 💚</p> : <p><span className="Character__Stats-single">Status:</span> {character.status} 🔴</p>)}</li>
                                <li className="Character__Stats"><p><span className="Character__Stats-single">Gender:</span> {character.gender}</p></li>
                                <li className="Character__Stats"><p><span className="Character__Stats-single">Specie:</span> {character.species}</p></li>
                                <li className="Character__Stats"><p><span className="Character__Stats-single">Name:</span> {character.origin.name}</p></li>
                            </ul>
                    </div>
                    <button className="Favorite__button" type="button" onClick={() => {handleAddFavorite(character)}}><i className="fas fa-star"></i></button>
                </div>
    ))}
        </div>
        <div className="Buttons__container">
            <button className="Page__button" onClick={() => {setPages(pages - 1)}}><i className="fas fa-arrow-left"/></button>
            <button className="Page__button" onClick={() => {setPages(pages + 1)}}><i className="fas fa-arrow-right"/></button>
        </div>
        </div>
    )
}

export default Characters;