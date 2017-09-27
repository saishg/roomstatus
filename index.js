/**
 * Created by tvankada on 9/27/17.
 */
var request = require('request');
var schedule = require('node-schedule');
var constants = require('./Constants');

function execute() {
    request({
        uri: constants.SERVER_URL,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
    }, function(error, response, roomStatus) {
        roomStatus = JSON.parse(roomStatus);
    });
}
execute();
// Code to run the execute function every 1 minute
var j = schedule.scheduleJob('*/1 * * * *', function(){
    execute();
});
