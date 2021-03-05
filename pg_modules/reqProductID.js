const request = require('request');


function func(pos) {

    if (orderProduct) {

        let id = orderProduct[pos].produktBillbeeId;

        console.log(id);

        const options = {
            url: 'https://app.billbee.io/api/v1/products/' + id,
            credentials: 'include',
            headers: {
                'X-Billbee-Api-Key': 'CAE10BC1-74A8-455A-B60C-055625C74AC1',
                'Authorization': 'Basic aW5mb0BmYXJiZW5sb2V3ZS5kZTpqb25haHJ1c2No',
                'Content-Type': 'application/json',
            }
        };


        request.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {

                let data = JSON.parse(body);
                let tagID = data.Data.Tags[0];
                return tagID;

            } else {
                console.log('An Error in the second Billbee-Request (Product-Request) occured: ' + response.statusCode);
            }
        });

    }
}

module.exports.func = func;