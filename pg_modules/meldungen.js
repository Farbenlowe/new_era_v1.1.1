function endProcessing() {
    return console.log('- END PROCESSING -\n\n---------- READY FOR NEXT REQEST ----------\n');
}

function error406(err) {
    return console.log('\n!!! ERROR !!!\nstatus-code: 406 – Zu wenig Informationen bei der Bestellung gefunden.\nstatus-meldung: ' + err + '\n- END PROCESSING -\n\n---------- READY FOR NEXT REQEST ----------\n');
}

module.exports.endProcessing = endProcessing;
module.exports.error406 = error406;