import { useState, useEffect } from 'react'
import './App.css'
import ItemLevel from "./components/ItemLevel"
import Scorebug from "./components/Scorebug"
import Inhibitors from "./components/Inhibitors"
import DragTimer from './components/DragTimer'
import HerBaronTimer from './components/HerBaronTimer'

function App() {
  const [state, setState] = useState([]);

  /*const makeAPICall = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {mode:'cors'});
      const data = await response.json();
      setState(data);
    }
    catch (e) {
      console.log(e)
    }
  }*/

  /*useEffect(() => {
    setInterval(() => {
      makeAPICall();
    }, 1000);
  }, [])*/

  const testData = {
    gameTime: "00:00",
    blueTeam:{
      teamGold: "122.5k",
      teamKills: 50,
      towerKills: 11,
    },
    redTeam:{
      teamGold: '122.5k',
      teamKills: 50,
      towerKills: 11,
    }
  }


  return (
    <>
      <Scorebug state={testData}/>
      <DragTimer/>
      <HerBaronTimer/>
      <ItemLevel />
      <Inhibitors />
    </>
  )
}

export default App

