import styles from "./styles/TeamKills.module.css"

const TeamKills = (props) =>{
    if(props.team =='blue'){
        return(
            <div className={styles.kills}>
                {props.kills}
                <img className={styles.img} src="../../images/BlueSword.png"></img>
            </div>
        )
    } else{
        return(
            <div className={styles.kills}>
                <img className={styles.img} src="../../images/RedSword.png"></img>
                {props.kills}
            </div>
        )
    }
}

export default TeamKills;