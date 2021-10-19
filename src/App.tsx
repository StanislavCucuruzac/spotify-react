
import './App.css';
import { Navbar } from './components/Navbar';
import { Principle } from './components/Principle';
import {useState, useEffect} from 'react'

const App = () => {
  
  return (
    <div className="outerWrap">
    <div className="App">
       <Navbar/>
       <Principle/>
        </div>     
        <div className="musicControls">musicControls</div>
    </div>
  );
}

export default App;
