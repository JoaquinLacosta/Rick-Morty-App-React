import React, { useState } from "react"
import Header from "./components/Header"
import Characters from "./components/Characters"

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
      setDarkMode(!darkMode)
  }
  return (
    <div className="App">
      <Header handleClick={handleClick} darkMode={darkMode}/>
      <Characters darkMode={darkMode} />
    </div>
  );
}

export default App;
