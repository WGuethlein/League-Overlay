const GameTime = (props) =>{
    return(
        <>
            {props.time != undefined ? props.time : 0}
        </>
    )
}

export default GameTime;