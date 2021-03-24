// IMPORTE
const request = require('request');
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const labelLookup = require('./path_generator_v1.1.1');


// HTTPS SERVER
const app = express();
const privatKey = fs.readFileSync('ssl_keys/www.new-era.digital.key', 'utf-8');
const certificate = fs.readFileSync('ssl_keys/certificate.crt', 'utf-8');
const credentials = { key: privatKey, cert: certificate };

https.createServer(credentials, app).listen(443, () => {
    console.log('-------------------------------------------');
    console.log('SERVER IS ONLINE AND LISTENING ON PORT: 443');
    console.log('-------------------------------------------');
    console.log('');
});

app.use(express.static('public'));
app.use(express.json());


// GLOBALE VARIABLEN
let corsOptions = {
    origin: 'https://new-era.digital',
    optionsSuccessStatus: 200
}

let pdf_merger_id;



// POST-REQUEST HANDLING (NEW ERA)
app.post('/api/orders', cors(corsOptions), (req, res) => {

    console.log('');
    console.log('REQUESTED ORDER: ' + req.body.Id);
    console.log('PDF MERGER IDTF: ' + req.headers.pdfidentifier);
    console.log('');

    pdf_merger_id = req.headers.pdfidentifier;

    function getProductTitle(id) {

        if (id.Id == '') {
            sendError('405', 'Keine Eingabe');
            return;
        }

        const options = {
            url: 'https://app.billbee.io/api/v1/orders/' + id.Id,
            credentials: 'include',
            headers: {
                // The Authorization
                'Content-Type': 'application/json',
            }
        };

        request.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let data = JSON.parse(body);

                labelLookup.resPasser(data, pdf_merger_id);
                let auftragPdf = labelLookup.path_gen();
                orderProduct = [];

                if (auftragPdf == 'Lackierset') {
                    sendX300();
                } else if (auftragPdf == 'err') {
                    sendError('406', 'Zu wenig Informationen bei der Bestellung gefunden, das Etikett muss manuell rausgesucht werden');
                } else {
                    sendBack(auftragPdf);
                }

            } else {
                console.log('');
                console.log('!!! ERROR !!!');
                console.log('the first billbee-request (Order-Req) failed');
                console.log('status-code: ' + response.statusCode + ' – ' + response.statusMessage);
                console.log('');
                sendError(response.statusCode, response.statusMessage);
            }
        });
    }
    getProductTitle(req.body);

    function sendError(err, meldung) {
        res.json({
            Meldung: 'Fehler ' + err + ' – ' + meldung
        });
        res.end();
    }

    function sendBack(auftragPdf) {
        res.json({
            path: auftragPdf
        });
        res.end();
    }

    function sendX300() {
        res.json({
            Meldung: 'Es handelt sich um ein Lackierset – Ein Etikett wird nicht benötigt'
        });
        res.end();
    }
});
