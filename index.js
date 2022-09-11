const {nextISSTimesForMyLocation} = require('./iss');

const nextTime = function(array) {
  for (const time of array) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;

    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, array) => {
  if (error) return console.log("ERROR >> ", error);

  nextTime(array);
})