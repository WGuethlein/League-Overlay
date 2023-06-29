import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header"


function App() {
  const [count, setCount] = useState(0)

  const [state, setState] = useState([]);
  const [gameTime, setGameTime] = useState()
  const [blueTeam, setBlueTeam] = useState([])
  const [redTeam, setRedTeam] = useState([])
  const [bp1, setbp1] = useState([])

  const makeAPICall = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {mode:'cors'});
      const data = await response.json();
      setState(JSON.stringify(data))
      setGameTime(data.gameTime);
      setBlueTeam(data.blueTeam)
      setRedTeam(data.redTeam)

      //console.log(data.blueTeam.players[0])
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    setInterval(() => {
      makeAPICall();
    }, 2000);
  }, [])

  return (
    <>
      Blue Team Kills: {blueTeam.teamKills}
      <br/>
      Blue Team Gold: {blueTeam.teamGold}
      <br/>
      Game Time: {gameTime}
      <br/>
      Red Team Kills: {redTeam.teamKills}
      <br/>
      Red Team Gold: {redTeam.teamGold}
    </>
  )
}

export default App
