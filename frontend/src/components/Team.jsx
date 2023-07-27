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
                <div className={styles.name}>ONU</div>
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
                <div className={styles.name}>MVNU</div>
            </div>
        )
    }
   
}

export default Team;