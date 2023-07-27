import styles from "./styles/TowerKills.module.css"

const TowerKills = (props) =>{
    if(props.team =='blue'){
        return(
            <div className={styles.kills}>
                <img alt=""></img>
                {props.towers}
            </div>
        )
    } else{
        return(
            <div className={styles.kills}>
                {props.towers}
                <img alt=""></img>
            </div>
        )
    }
}

export default TowerKills;