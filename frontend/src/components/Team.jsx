import DragKills from './DragKills'
import BaronKills from './BaronKills'
import TowerKills from './TowerKills'
import TeamGold from './TeamGold'
import TeamKills from './TeamKills'
import styles from "./styles/Team.module.css"

const Team = (props) =>{
    if(props.team === 'blue'){
        return(
            <div className={styles.team}>
                <div>Blue Accr</div>
                <DragKills />
                <BaronKills />
                <TowerKills />
                <TeamGold gold={props.data.teamGold != undefined ? props.data.teamGold : 0 }/>
                <TeamKills kills={props.data.teamKills != undefined ? props.data.teamKills : 0 }/>
            </div>
        )
    } else {
        return(
            <div className={styles.team}>
                    <TeamKills kills={props.data.teamKills != undefined ? props.data.teamKills : 0 }/>
                    <TeamGold gold={props.data.teamGold != undefined ? props.data.teamGold : 0 }/>
                    <TowerKills />
                    <BaronKills />
                    <DragKills />
                    <div>Red Accr</div>
            </div>
        )
    }
   
}

export default Team;