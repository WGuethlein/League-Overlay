
import GameTime from './GameTime'
import Team from './Team'
import styles from './styles/Scorebug.module.css'

const Scorebug = (props) =>{
    if(props.state){
        return(
            <div className="middle-wrapper">
                <div className={styles.topRow}>
                    <Team className={styles.teamRow} team='blue' data={props.state.blueTeam != undefined ? props.state.blueTeam : 0}/>
                    <div>Logo</div>
                    <Team className={styles.teamRow} team='red' data={props.state.redTeam != undefined ? props.state.redTeam : 0} />
                </div>
                <div className='bottom-row'>
                    <GameTime time={props.state.gameTime}/>
                </div>
            </div>
        )
    }
}

export default Scorebug;

