import React from "react"
import "./styles/Header.css"

const Header = ({handleClick, darkMode}) => {

    return(
        <header className={!darkMode ? "Header DarkMode" : "Header LightMode"}>
            <h1>React Hooks</h1>
            <button type="button" className={darkMode ? "Header__button DarkMode" : "Header__button LightMode"} onClick={handleClick}>Darkmode: {darkMode ? <i className="fas fa-toggle-off"></i>: <i className="fas fa-toggle-on"></i>}</button>
        </header>
    )
}

export default Header;