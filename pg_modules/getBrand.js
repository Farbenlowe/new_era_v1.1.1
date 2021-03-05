function func(x) {

    if (orderProduct) {

        let stringLength = orderProduct[x].titelBrickString.length;
        let zeichen = orderProduct[x].titelBrickString;
        let prdktString = orderProduct[x].produktTitel;

        for (let y = 0; y < stringLength; y++) {

            for (let z = 0; z < marke.length; z++) {
                let relevantLength = zeichen[y].index + marke[z].length;
                let _prKey = prdktString.slice(zeichen[y].index, relevantLength);

                if (marke[z] == _prKey) {
                    orderProduct[x].marke = marke[z];
                    return;
                }
            }
        }
    }
}

const marke = ['Hamburger Lack-Profi', 'Halvar', 'Lausitzer Farbwerke', 'Paint IT!', 'Paint IT', 'Grünwalder',
    'FARBENLÖWE', 'The Flynn', 'Goldmeister Farben', 'Hamburger Profi-Lack', 'Farben Löwe'
];

module.exports.func = func;