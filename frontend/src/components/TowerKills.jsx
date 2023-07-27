import styles from "./styles/TowerKills.module.css"

const TowerKills = (props) =>{
    if(props.team =='blue'){
        return(
            <div className={styles.kills}>
                {props.towers}
                <i className={`fas fa-chess-rook fa-xs ${styles.blue} ${styles.ico}`}></i>
            </div>
        )
    } else{
        return(
            <div className={styles.kills}>
                <i className={`fas fa-chess-rook fa-xs ${styles.red} ${styles.ico}`}></i>
                {props.towers}
            </div>
        )
    }
}

export default TowerKills;