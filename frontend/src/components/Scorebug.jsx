
import GameTime from './GameTime'
import Team from './Team'
import styles from './styles/Scorebug.module.css'

const Scorebug = (props) =>{
    if(props.state){
        return(
            <div className={styles.wrapper}>
                <div className={styles.topRow}>
                    <Team className={styles.teamRow} team='blue' data={props.state.blueTeam != undefined ? props.state.blueTeam : 0}/>
                    <img className={styles.Logo} src="../../images/onu_head_96x64.png" alt="Logo" srcSet="../../images/onu_head.png" />
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

