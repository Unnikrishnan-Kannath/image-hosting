import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import login from "./pages/Login/Login";
import signUp from "./pages/Sign_up/SignUp";
import Images from "./pages/Images/Images";
import dashBoard from "./pages/Dashboard/Dashboard";
import {ImageContext} from './components/Context';
import React, { useCallback , useState } from "react";

function App() {
  const [inputImages,setInputImages] =useState([]);
  const context = {
    image:{
      images: inputImages,
      update: (value) => setInputImages(value)
    }
  };
  return (
    <div>
      <ImageContext.Provider value={context.image}>
      <Router>
        <Routes>
          <Route path="/" Component={login} />
          <Route path="/home" Component={dashBoard} />
          <Route path="/sign-up" Component={signUp} />
          <Route path="/images" Component={Images} />
        </Routes>
      </Router>
      </ImageContext.Provider>
    </div>
  );
}

export default App;
