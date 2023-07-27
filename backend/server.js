const express = require("express");
const app = express();
const farsight = require("./modules/native-farsight-module");
const sanitizeData = require("./functions/sanitizeData.js");
const sanitizeLiveEvent = require('./functions/sanitizeLiveEvent')


// liveClient imports
const liveClient_URL = "https://127.0.0.1:2999/liveclientdata/allgamedata";
const { fetchWithRetry } = require("./functions/utils");
const { Agent, setGlobalDispatcher } = require("undici");

//liveEvents imports
const { Server } = require("socket.io");
const http = require('http')
const net = require('net')

const server = http.createServer(app);
let intervalConnect = false;
var client = new net.Socket();

const tempResp = require("./response.json")

//create a new socket.io ws, cors for dev
// MIGHT NOT NEED
const io = new Server(server, {
	cors: {
		origin: "localhost:3000",
	},
});


//tcp stram for live events
const connect = () => {
	client.connect({
		port: 34243,
		host: "127.0.0.1",
	});
};
const agent = new Agent({
	connect: {
		rejectUnauthorized: false,
	},
});

setGlobalDispatcher(agent);

connect();

const launchIntervalConnect = () =>{
    if(intervalConnect) return
    intervalConnect = setInterval(connect, 500)
}

const clearIntervalConnect = () =>{
    if(false == intervalConnect) return
    clearInterval(intervalConnect)
    intervalConnect = false;
}

const  liveEventObject = [];

//liveEvent code
client.on("connect", () => {
	clearIntervalConnect(intervalConnect);
	console.log("connected to server", "TCP");
	client.write("CLIENT connected");

	// create a semi-sanitized object for the liveEvents
	// pass it the new data and the previous state
	liveEventObject = sanitizeLiveEvent(d.toString(), liveEventObject)
});

client.on("error", (err) => {
	console.log(err.code, "TCP ERROR");
	launchIntervalConnect(intervalConnect);
});

client.on("close", launchIntervalConnect);
client.on("end", launchIntervalConnect);



// warm farsight before starting, will only have half the required data without library connection
const farsightInit = initFarsight();

// if farsight is initialized correctly, start showing data
if (farsightInit) {
	app.get("/", async (req, res) => {
		res.set('Access-Control-Allow-Origin', '*');
		var liveClientState = await fetchWithRetry(liveClient_URL)
			.catch(function (err) {
				console.log(
					`There was a problem with the fetch operation: ${err.message}`
				);
			})
			.then(function (json) {
				return (data = json);
			});

		const farsightState = getSnapshot();

		let sanitizedState = await sendData(liveClientState, farsightState, liveEventData);
		
		res.json(sanitizedState);
	});
}

async function initFarsight() {
	var res = await farsight.connectToLeague();

	if (res && farsight.isReady()) {
		return true;
	}

	var timeout = setInterval(() => {
		if (!farsight.isReady() || !res) {
			res = farsight.connectToLeague();
		}
		if (res && farsight.isReady()) {
			return true;
		}
	}, 1000);
}

// get a snapshot from farsight
const getSnapshot = () => {
	console.log("Farsight making snapshot");
	const response = farsight.makeSnapshot();

	return response;
};

// sendData to be sanitized and refactored
async function sendData(liveClientState, farsightState) {
	if (farsightState.gameTime == 0) {
		// need to reset connection for start/end game cases
		//will either crash or not allow data collection without reset
		farsight.disconnectFromLeague();
		farsight.connectToLeague();
	}

	//check if liveClientState, farsightState data have been received, as well as check if the farsightState object is correct
	if (
		liveClientState != undefined &&
		farsightState != undefined &&
		farsightState.nextDragonType
	) {
		//need to re-connect to league, farsight disconnects at some point

		let sanitizedState = await sanitizeData(farsightState, liveClientState);

		return sanitizedState;
	}
	return [farsightState];
}




app.listen(3001);
