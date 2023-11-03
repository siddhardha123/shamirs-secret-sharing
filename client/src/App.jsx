import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/"  element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={ <SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;
