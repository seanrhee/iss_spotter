/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) { 
// use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Respsonse: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body);

    callback(null, ip.ip);
  })
}

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    const locationInfo = JSON.parse(body);

    if (!locationInfo.success) {
      callback(Error(`Invalid IP`), null);
      return;
    }

    const { latitude, longitude } = locationInfo;

    callback(null, {latitude, longitude});

  })
}

module.exports = { fetchMyIP, fetchCoordsByIP };