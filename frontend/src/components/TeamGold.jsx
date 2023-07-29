import styles from "./styles/TeamGold.module.css"

const TeamGold = (props) =>{
    if(props.team =='blue'){
        return(
            <div className={`${styles.gold} ${styles.blue}`}>
                {props.gold}
                <i className={`fa fa-gg-circle ${styles.blueI} ${styles.ico}`}></i>
            </div>
        )
    } else{
        return(
            <div className={`${styles.gold} ${styles.red}`}>
                <i className={`fa fa-gg-circle ${styles.redI} ${styles.ico}`}></i>
                {props.gold}
            </div>
        )
    }
    
}

export default TeamGold;