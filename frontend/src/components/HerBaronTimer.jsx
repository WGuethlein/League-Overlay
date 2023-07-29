import styles from "./styles/HerBaronTimer.module.css"

const HerBaronTimer = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>Icon</div>
            <div className={styles.time}>Time</div>
        </div>
    )
}

export default HerBaronTimer;