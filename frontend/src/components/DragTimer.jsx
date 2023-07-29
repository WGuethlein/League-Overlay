import styles from "./styles/DragTimer.module.css"

const DragTimer = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>Icon</div>
            <div className={styles.time}>Time</div>
        </div>
    )
}

export default DragTimer;