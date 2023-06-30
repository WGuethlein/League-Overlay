import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

  return (
    <>
      <Scorebug state={state}/>
    </>
  )
}

export default App

//<ItemLevel state={state}/>
//<Inhibitors state={state}/>