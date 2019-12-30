/*
// Framework: Logging
// Description: Logs given data with 'console.log', attaching the timestamp. 
*/

module.exports = (data) => {
    var time = new Date();
    console.log(`${time.toDateString()} ${time.toLocaleTimeString()} -- ${data}`);
};