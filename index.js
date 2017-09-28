/**
 * Created by tvankada on 9/27/17.
 */
var request = require('request');
var schedule = require('node-schedule');
var constants = require('./constants');
var tessel = require('tessel');


console.log(constants.SERVER_URL);
function execute() {
    request({
        uri: constants.SERVER_URL,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        rejectUnauthorized: false,
        requestCert: false,
        agent: false
    }, function(error, response, roomStatus) {
        roomStatus = JSON.parse(roomStatus);
        if (roomStatus.status === 'Busy') {
            console.log(roomStatus.status);
            tessel.led[2].on();
            tessel.led[3].on();
           
        } else  if (roomStatus.status === 'Free') {
            console.log(roomStatus.status);
            tessel.led[2].off();
            tessel.led[3].off();
         
        }
    });
}
execute();
// Code to run the execute function every 1 minute
var j = schedule.scheduleJob('*/2 * * * * *', function(){
    execute();
});
