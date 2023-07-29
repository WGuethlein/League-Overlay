import styles from './styles/GameTime.module.css'

const GameTime = (props) =>{
    return(
        <div className={styles.time}>
            {props.time != undefined ? props.time : 0}
        </div>
    )
}

export default GameTime;