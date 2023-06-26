const convertToMinSec = (sec) => {
    var min = Math.floor(sec/60);
    var sec = Math.floor(sec%60);
    var string = (min<10 ? "0" : "") + min + ":" + (sec < 10 ? "0" + sec : sec % 10 === 0 ? sec : sec) 
    return string
}

const convertToKStr = (gold) => {
    return `${(gold/1000).toFixed(1)}K`
}

function fetchWithRetry(url) {
	retryLimit = Number.MAX_VALUE;
	let retryCount = 0;
	return fetch(url).then(function (res) {
		//console.log(res.status);
		if (res.status !== 200 && retryCount < retryLimit) {
			return fetchWithRetry(url);
		} else {
			return res.json();
		}
	});
}



module.exports = {convertToMinSec, convertToKStr, fetchWithRetry}