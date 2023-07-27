import styles from "./styles/TeamGold.module.css"

const TeamGold = (props) =>{
    if(props.team =='blue'){
        return(
            <div className={styles.gold}>
                {props.gold}
                <i className={`fa fa-gg-circle ${styles.blue} ${styles.ico}`}></i>
            </div>
        )
    } else{
        return(
            <div className={styles.gold}>
                <i className={`fa fa-gg-circle ${styles.red} ${styles.ico}`}></i>
                {props.gold}
            </div>
        )
    }
    
}

export default TeamGold;