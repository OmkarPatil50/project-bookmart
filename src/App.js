import { useEffect } from "react";
import {Routes , Route} from 'react-router-dom'

import Mockman from 'mockman-js'

import "./App.css";
import { Landing } from "./Pages/Landing/Landing";
import { Login } from "./Pages/Auth/Login";


function App() {





  return (
    <div className="App">



    <Routes>
      <Route path='/mockman' element={<Mockman/>}/>
      <Route path= '/' element={<Landing/>}/>
      <Route path= '/login' element={<Login/>}/>

    </Routes>
    </div>
  );
}

export default App;
