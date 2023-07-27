

module.exports = (data, prevState) => {
    if(prevState == []){
        return {
            blueTeam: {
                towerKills: 0,
                baronKills: {
                    total: 0,
                    types:[
                        {
                            name:"Ocean",
                            timeKilled: 224.231
                        }
                    ]
                },
            },
            redTeam: {
                towerKills: 0,
                baronKills: {
                    total: 0,
                    types:[
                        {
                            name:"Hextech",
                            timeKilled: 193.231
                        }
                    ]
                },
            }
        }
    } else if (prevState != [] && data != []){
        
    }
}