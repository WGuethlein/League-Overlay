import styles from "./styles/TeamGold.module.css"

const TeamGold = (props) =>{
    if(props.team =='blue'){
        return(
            <div className={styles.gold}>
                <img alt="" ></img>
                {props.gold}
            </div>
        )
    } else{
        return(
            <div className={styles.gold}>
                {props.gold}
                <img alt=""></img>
            </div>
        )
    }
    
}

export default TeamGold;