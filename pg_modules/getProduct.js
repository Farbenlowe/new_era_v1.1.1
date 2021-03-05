function func(pos) {

    if (orderProduct) {

        let stringLength = orderProduct[pos].titelBrickString.length;
        let zeichen = orderProduct[pos].titelBrickString;
        let prdktString = orderProduct[pos].produktTitel;

        for (let i = 0; i < stringLength; i++) {

            for (let x = 0; x < prKey.length; x++) {
                let relevantLength = zeichen[i].index + prKey[x].length;
                let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                if (prKey[x] == _prKey) {
                    switch (prKey[x]) {
                        case 'Holzschutzfarbe':
                            prdktHolzschutz();
                            break;
                        case 'Metallschutzlack':
                            prdktMetallschutz();
                            break;
                        case 'Bootslack':
                            prdktBoots();
                            break;
                        case 'Schwimmbeckenfarbe':
                            prdktSchwimm();
                            break;
                        default:
                            orderProduct[pos].produkt = prKey[x];
                            break;
                    }
                }
            }
        }

        function prdktHolzschutz() {
            for (let i = 0; i < stringLength; i++) {

                let relevantLength = zeichen[i].index + prKey[22].length;
                let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                if (prKey[22] == _prKey) {
                    orderProduct[pos].produkt = prKey[22];
                    return
                }

                if (i == stringLength - 1 && orderProduct[pos].produkt == '') {
                    orderProduct[pos].produkt = 'Holzschutzfarbe';
                    return
                }

            }

        }

        function prdktMetallschutz() {
            const metallschutz = ['3in1', '3-in-1', '3 in 1'];

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < metallschutz.length; x++) {
                    let relevantLength = zeichen[i].index + metallschutz[x].length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (metallschutz[x] == _prKey) {
                        orderProduct[pos].produkt = metallschutz[0];
                        return
                    }

                    if (i == stringLength - 1 && orderProduct[pos].produkt == '') {
                        orderProduct[pos].produkt = 'Metallschutzlack';
                        return
                    }
                }
            }
        }

        function prdktBoots() {
            const bootsl = ['2K', '2 K', '2-K', 'GFK'];

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < bootsl.length; x++) {
                    let relevantLength = zeichen[i].index + bootsl[x].length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (bootsl[x] == _prKey) {
                        orderProduct[pos].produkt = '2K Bootslack';
                        return
                    }

                    if (i == stringLength - 1 && orderProduct[pos].produkt == undefined) {
                        orderProduct[pos].produkt = 'Bootslack';
                        return
                    }
                }
            }
        }

        function prdktSchwimm() {
            const schwimm = ['2K', '2 K', '2-K', 'GFK'];

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < schwimm.length; x++) {
                    let relevantLength = zeichen[i].index + schwimm[x].length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (schwimm[x] == _prKey) {
                        orderProduct[pos].produkt = '2K Schwimmbeckenfarbe';
                        return
                    }

                    if (i == stringLength - 1 && orderProduct[pos].produkt == '') {
                        orderProduct[pos].produkt = 'Schwimmbeckenfarbe';
                        return
                    }
                }
            }
        }
    }
}

module.exports.func = func;


const prKey = ['Fliesenlack', 'Betonfarbe', 'Metallschutzlack', 'Holzschutzfarbe', 'Bootslack', 'Schwimmbeckenfarbe', 'Buntlack', '3in1',
    'Badewannenlack', 'Rostschutzfarbe', 'Holzlasur', 'Parkettlack', 'Antischimmelfarbe', 'Autolack', '2K Grundierung', '2K Klarlack',
    'erdünnung 700', 'erdünnung 227', 'erdünnung 2K/400', 'X300', 'schwimmbeckenfarbe', 'Holz-Lasur', 'PU Holzschutzfarbe', 'PARKETTLACK', '2-K Grundierung', 'Bunt-Lack', 'Metallschutz-lack'
];