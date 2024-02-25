import {createContext, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import SettingsPage from "./components/SettingsPage.jsx";

export const SettingsContext =createContext(null);

function App() {
  return (
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/settings" element={<SettingsPage/>}/>
            </Routes>
        </div>
    </Router>
  )
}

export default App
