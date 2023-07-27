import DragKills from './DragKills'
import BaronKills from './BaronKills'
import TowerKills from './TowerKills'
import TeamGold from './TeamGold'
import TeamKills from './TeamKills'
import styles from "./styles/Team.module.css"
import {useState, useEffect} from "react"


import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';



const Team = (props) =>{
    const [blueTeam, setBlueTeam] = useState(localStorage.getItem("blueTeam"))
    const [redTeam, setRedTeam] = useState(localStorage.getItem("redTeam"))

    useEffect(() => {
        // storing input name
        localStorage.setItem('blueTeam', blueTeam);
        localStorage.setItem('redTeam', redTeam)
    }, [blueTeam,redTeam]);


    if(props.team === 'blue'){
        return(
            <div className={styles.team}>
                <div className={styles.name} contentEditable="true" onBlur={(e) => setBlueTeam(e.currentTarget.textContent)} suppressContentEditableWarning={true}>{localStorage.getItem("blueTeam")}</div>
                <TowerKills team={props.team} towers={props.data.towerKills != undefined ? props.data.towerKills : 0}/>
                <TeamGold team={props.team} gold={props.data.teamGold != undefined ? props.data.teamGold : 0}/>
                <TeamKills team={props.team} kills={props.data.teamKills != undefined ? props.data.teamKills : 0}/>
            </div>
        )
    } else {
        return(
            <div className={styles.team}>
                <TeamKills team={props.team} kills={props.data.teamKills != undefined ? props.data.teamKills : 0}/>
                <TeamGold team={props.team} gold={props.data.teamGold != undefined ? props.data.teamGold : 0}/>
                <TowerKills team={props.team} towers={props.data.towerKills != undefined ? props.data.towerKills : 0}/>
                <div className={styles.name} contentEditable="true" onBlur={(e) => setRedTeam(e.currentTarget.textContent)} suppressContentEditableWarning={true}>{localStorage.getItem("redTeam")}</div>
            </div>
        )
    }
   
}

export default Team;