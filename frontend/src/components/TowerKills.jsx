import styles from "./styles/TowerKills.module.css"

const TowerKills = (props) =>{
    if(props.team =='blue'){
        return(
            <div className={`${styles.kills} ${styles.blue}`}>
                {props.towers}
                <i className={`fas fa-chess-rook fa-xs ${styles.blueI} ${styles.ico}`}></i>
            </div>
        )
    } else{
        return(
            <div className={`${styles.kills} ${styles.red}`}>
                <i className={`fas fa-chess-rook fa-xs ${styles.redI} ${styles.ico}`}></i>
                {props.towers}
            </div>
        )
    }
}

export default TowerKills;