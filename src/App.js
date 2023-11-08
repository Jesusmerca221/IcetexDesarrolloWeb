import React from "react";
import "./App.css";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Index from "./Routes";
import Home from "./Routes/home";
import Admin from "./Routes/admin";
import Logup from "./Routes/logup";
import Login from "./Routes/login";

function App() {
  return (
  <BrowserRouter>         
        <Routes>          
          <Route path="" Component={Index}></Route>
          <Route path="home" Component={Home}></Route>
          <Route path="login" Component={Login}></Route>
          <Route path="logup" Component={Logup}></Route>
          <Route path="admin" Component={Admin}></Route>
        </Routes>       
    </BrowserRouter>
  );
}

export default App;


