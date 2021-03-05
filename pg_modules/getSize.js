function func(x) {

    if (orderProduct) {

        let stringLength = orderProduct[x].titelBrickString.length;
        let zeichen = orderProduct[x].titelBrickString;
        let prdktString = orderProduct[x].produktTitel;

        for (let y = 0; y < stringLength; y++) {

            for (let z = 0; z < menge.length; z++) {
                let relevantLength = zeichen[y].index + menge[z].length;
                let _prKey = prdktString.slice(zeichen[y].index, relevantLength);

                if (menge[z] == _prKey) {
                    orderProduct[x].größe = menge[z];
                    return;
                }
            }
        }
    }
}

module.exports.func = func;

const menge = [
    '0,5 L', '0,5 l', '0,5L', '0,5l', '0.5L', '0.5 L', '0.5l', '0.5 l',
    '1 L', '1 l', '1L', '1l',
    '2,5 L', '2,5 l', '2,5L', '2,5l', '2.5L', '2.5 L', '2.5l', '2.5 l', '2½ L',
    '5 L', '5 l', '5L', '5l',
    '10 L', '10 l', '10L', '10l',
    '20 L', '20 l', '20L', '20l',
    '30 L', '30 l', '30L', '30l',
    '0,5 Kg', '0,5 kg', '0,5Kg', '0,5kg', '0.5Kg', '0.5 Kg', '0.5kg', '0.5 kg',
    '1 Kg', '1 kg', '1Kg', '1kg',
    '2,5 Kg', '2,5 kg', '2,5Kg', '2,5kg', '2.5Kg', '2.5 Kg', '2.5kg', '2.5 kg',
    '5 Kg', '5 kg', '5Kg', '5kg',
    '10 Kg', '10 kg', '10Kg', '10kg',
    '20 Kg', '20 kg', '20Kg', '20kg',
    '30 Kg', '30 kg', '30Kg', '30kg'
];