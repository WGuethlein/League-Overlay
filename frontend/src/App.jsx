import { useState, useEffect } from 'react'
import './App.css'
import ItemLevel from "./components/ItemLevel"
import Scorebug from "./components/Scorebug"
import Inhibitors from "./components/Inhibitors"

function App() {
  const [state, setState] = useState([]);

  const makeAPICall = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {mode:'cors'});
      const data = await response.json();
      setState(data);
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setInterval(() => {
      makeAPICall();
    }, 1000);
  }, [])

  const testData = {
    gameTime: "00:00",
    blueTeam:{
      teamGold: "10K",
      teamKills: 12,
      towerKills: 1,
    },
    redTeam:{
      teamGold: '12k',
      teamKills: 4,
      towerKills: 0,
    }
  }


  return (
    <>
      <Scorebug state={testData}/>
      <ItemLevel />
      <Inhibitors />
    </>
  )
}

export default App

