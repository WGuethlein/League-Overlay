const _ = require("lodash");
const { convertToMinSec, convertToKStr } = require("./utils");

module.exports = async (state, liveClientState) => {
	//clear out the unnecessary data from each state
	let sanitizedFarsightState = _.omit(state, ["other", "turrets", "jungle"]);
	let sanitizedLiveClientState = _.omit(liveClientState,["activePlayer", "events"]);

	//clear up the player/champion objects from farsight state
	for (let i = 0; i < 10; i++) {
		sanitizedFarsightState.champions[i] = _.omit(sanitizedFarsightState.champions[i], [
			"networkId",
			"objectIndex",
			"position",
		]);
	}

	//clear unnecessary inhibitor data from farsight state
	for (let i = 0; i < 6; i++) {
		sanitizedFarsightState.inhibitors[i] = _.omit(sanitizedFarsightState.inhibitors[i], [
			"name",
			"displayName",
			"networkId",
			"mana",
			"maxMana",
		]);
	}

	//separate state objects into teams, easier to sanitize/refactor
	// farsight teams
	var blueTeamFarsight = _.filter(sanitizedFarsightState.champions, ["team", 100]);
	var redTeamFarsight = _.filter(sanitizedFarsightState.champions, ["team", 200]);
	// live Client teams
	var blueTeamLiveClient = _.filter(sanitizedLiveClientState.allPlayers,['team',"ORDER"])
	var redTeamLiveClient = _.filter(sanitizedLiveClientState.allPlayers,['team',"CHAOS"])

	//build/format player objects
	for (let i = 0; i < 5; i++) {
		/*
		{
			name: 'str',
			displayName: 'str',
			isAlive: bool,
			health: int,
			maxHealth: int,
			mana: int,
			maxMana: int,
			currentGold: int,
			totalGold: int,
			items: [obj], 			//liveClient
			runes: [obj], 			//liveClient
			scores: [obj], 			//liveClient
			experience: int,
			level: int
		}
		*/
		blueTeamFarsight[i] = setTeam(blueTeamFarsight[i], blueTeamLiveClient[i]);
		redTeamFarsight[i] = setTeam(redTeamFarsight[i], redTeamLiveClient[i]);
	}

	// init team gold and team kill variables to 0
	var blueTeamGold, redTeamGold, blueTeamKills, redTeamKills = 0;

	//calculate total team gold
	for (let i = 0; i < 5; i++) {
		blueTeamGold += blueTeamFarsight[i].totalGold;
		redTeamGold += redTeamFarsight[i].totalGold;
	}

	//calculate team kills
	for (let i = 0; i < 5; i++) {
		blueTeamKills += blueTeamLiveClient[i].scores.kills;
		redTeamKills += redTeamLiveClient[i].scores.kills;
	}

	var packagedTeamData = [blueTeamFarsight, redTeamFarsight, blueTeamGold, redTeamGold, blueTeamKills, redTeamKills]

	
  	// complete refactored object
	var refactoredState = refactorState(sanitizedFarsightState, packagedTeamData);
	/*
	{
		gameTime: 'str',
		nextDrag: 'str',
		blueTeam: {
			teamGold: 'str',
			teamKills: int,
			players: [obj],
		},
		redTeam: {
			teamGold: 'str',
			teamKills: int,
			players: [obj],
		},
		inhibs: [obj],
	}
	*/

	return refactoredState;
};



const setTeam = (farsightPlayer, liveClientPlayer) => {
	return {
		name: farsightPlayer.name,
		displayName: farsightPlayer.displayName,
		isAlive: farsightPlayer.isAlive,
		health: Math.round(farsightPlayer.health),
		maxHealth: Math.round(farsightPlayer.maxHealth),
		mana: Math.round(farsightPlayer.mana),
		maxMana: Math.round(farsightPlayer.maxMana),
		currentGold: Math.round(farsightPlayer.currentGold),
		totalGold: Math.round(farsightPlayer.totalGold),
		items: liveClientPlayer.items, 
		runes: liveClientPlayer.runes, 
		scores: liveClientPlayer.scores, 
		experience: Math.round(farsightPlayer.experience),
		level: farsightPlayer.level,
	};
};

const refactorState = (sanitizedFarsightState, packagedTeamData) => {
 return {
  gameTime: convertToMinSec(sanitizedFarsightState.gameTime),
  nextDrag: sanitizedFarsightState.nextDragonType,
  blueTeam: {
    teamGold: convertToKStr(Math.round(packagedTeamData[2])),
    teamKills: packagedTeamData[4],
    players: packagedTeamData[0],
  },
  redTeam: {
    teamGold: convertToKStr(Math.round(packagedTeamData[3])),
    teamKills: packagedTeamData[5],
    players: packagedTeamData[1],
  },
  inhibs: sanitizedFarsightState.inhibitors,
};
}