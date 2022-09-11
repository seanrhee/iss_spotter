const {nextISSTimesForMyLocation} = require('./iss_promised');

const nextTime = function(array) {
  for (const time of array) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;

    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation()
  .then((passTimes) => {
    nextTime(passTimes);
  })
  .catch((error) => {
    console.log("ERROR >> ", error);
  })