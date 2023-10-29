import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/">hello</Route>
                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={ <SignUp />} />
                <Route path="/home" element={ <Home />} />
            </Routes>
        </Router>
    );
}

export default App;
