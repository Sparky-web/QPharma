const functions = require('firebase-functions');

exports.sendReply = functions.https.onCall(data => {
    console.log(data)
    return "OK"
})
