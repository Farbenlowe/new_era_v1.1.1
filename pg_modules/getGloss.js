function func(pos) {

    if (orderProduct) {

        let stringLength = orderProduct[pos].titelBrickString.length;
        let zeichen = orderProduct[pos].titelBrickString;
        let prdktString = orderProduct[pos].produktTitel;

        for (let i = 0; i < stringLength; i++) {

            // Holzlasur ist immer seidenmatt

            if (orderProduct[pos].produkt == 'Holzlasur') {
                orderProduct[pos].glanzgrad = Glanz[0];
                break;
            }

            if (orderProduct[pos].glanzgrad != undefined) {
                break;
            }

            for (let x = 0; x < Glanz.length; x++) {
                let relevantLength = zeichen[i].index + Glanz[x].length;
                let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                if (Glanz[x] == _prKey) {
                    orderProduct[pos].glanzgrad = Glanz[x];
                    break;
                }
            }

            // Wenn kein Glanzgrad gefunden wurde, wird der Default-Wert: 'Glänzend' gesetzt

            if (i == stringLength - 1 && orderProduct[pos].glanzgrad == undefined) {

                if (orderProduct[pos].produkt == 'Holzschutzfarbe') {
                    orderProduct[pos].glanzgrad = Glanz[0];
                } else {
                    orderProduct[pos].glanzgrad = Glanz[4];
                }
            }
        }
    }
}

module.exports.func = func;


const Glanz = ['seidenmatt', 'SEIDENMATT', 'matt', 'MATT', "glänzend", 'GLÄNZEND'];