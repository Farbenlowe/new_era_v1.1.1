function func(pos) {

    if (orderProduct) {

        let stringLength = orderProduct[pos].titelBrickString.length;
        let zeichen = orderProduct[pos].titelBrickString;
        let prdktString = orderProduct[pos].produktTitel;

        for (let i = 0; i < stringLength; i++) {

            for (let x = 0; x < validNumbers.length; x++) {

                if (zeichen[i].indicator == validNumbers[x]) {
                    ralWert(i);
                    break;
                }
            }

            function ralWert(index) {

                if (!zeichen[index + 3]) {
                    keinRAL();
                } else if (!zeichen[index + 2]) {
                    keinRAL();
                } else if (!zeichen[index + 1]) {
                    keinRAL();
                } else {
                    let a = (validNumbers.indexOf(zeichen[index + 1].indicator) + 1) / (validNumbers.indexOf(zeichen[index + 1].indicator) + 1);
                    let b = (validNumbers.indexOf(zeichen[index + 2].indicator) + 1) / (validNumbers.indexOf(zeichen[index + 2].indicator) + 1);
                    let c = (validNumbers.indexOf(zeichen[index + 3].indicator) + 1) / (validNumbers.indexOf(zeichen[index + 3].indicator) + 1);

                    if (a == 1 && b == 1 && c == 1) {
                        let anRAL = andererRAL();
                        if (anRAL == false) {
                            orderProduct[pos].ral = prdktString.slice(index, index + 4);
                        }
                    }
                }
            }

            // Wenn keine vier zusammenhängenden Zahlen gefunden wurden, wird eine Keyword-basierte Suche nach Farben gestartet

            if (i == stringLength - 1 && orderProduct[pos].ral == undefined) {
                keinRAL();
            }

            function keinRAL() {
                // Holzschutzfarbe gibt es nicht in den gängigen RAL-Tönen, deshalb eine separate Suche, wenn das Produkt = Holzschutzfarbe ist

                if (orderProduct[pos].produkt == 'Holzschutzfarbe') {

                    for (let i = 0; i < stringLength; i++) {

                        for (let x = 0; x < farben_Holzschutzfarbe.length; x++) {
                            let relevantLength = zeichen[i].index + farben_Holzschutzfarbe[x].Farbe.length;
                            let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                            if (farben_Holzschutzfarbe[x].Farbe == _prKey) {
                                let anRAL = andererRAL();
                                if (anRAL == false) {
                                    orderProduct[pos].ral = farben_Holzschutzfarbe[x].Nummer;
                                    break;
                                }
                            }
                        }
                    }

                    // Holzlasur hat ebenfalls eigene Farbtöne

                } else if (orderProduct[pos].produkt == 'Holzlasur') {

                    for (let i = 0; i < stringLength; i++) {

                        for (let x = 0; x < farben_Holzlasur.length; x++) {
                            let relevantLength = zeichen[i].index + farben_Holzlasur[x].Farbe.length;
                            let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                            if (farben_Holzlasur[x].Farbe == _prKey) {
                                let anRAL = andererRAL();
                                if (anRAL == false) {
                                    orderProduct[pos].ral = farben_Holzlasur[x].Nummer;
                                    break;
                                }
                            }
                        }
                    }

                } else {

                    for (let i = 0; i < stringLength; i++) {

                        for (let x = 0; x < farben_ausgeschrieben.length; x++) {
                            let relevantLength = zeichen[i].index + farben_ausgeschrieben[x].Farbe.length;
                            let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                            if (farben_ausgeschrieben[x].Farbe == _prKey) {
                                let anRAL = andererRAL();
                                if (anRAL == false) {
                                    switch (farben_ausgeschrieben[x].Farbe) {
                                        case 'weiß':
                                        case 'Weiß':
                                            let Weiß = weiß();
                                            if (Weiß == false) {
                                                orderProduct[pos].ral = farben_ausgeschrieben[x].Nummer;
                                                break;
                                            }
                                        case 'grau':
                                        case 'Grau':
                                            let Grau = grau();
                                            if (Grau == false) {
                                                orderProduct[pos].ral = farben_ausgeschrieben[x].Nummer;
                                                break;
                                            }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        function andererRAL() {

            const ralSenden = ['Anderer RAL', 'anderer RAL', 'Anderer Ral', 'anderer Ral'];

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < ralSenden.length; x++) {
                    let relevantLength = zeichen[i].index + ralSenden[x].length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (ralSenden[x] == _prKey) {
                        orderProduct[pos].ral = '????';
                        return true;
                    }
                }
                if (i == stringLength - 1) { // && Auftrag_Id.RAL == '') {
                    return false;
                }
            }

        }

        function weiß() {

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < _weiß.length; x++) {
                    let relevantLength = zeichen[i].index + _weiß[x].Farbe.length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (_weiß[x].Farbe == _prKey) {
                        orderProduct[pos].ral = _weiß[x].Nummer;
                        return true;
                    }

                    if (i == stringLength - 1 && orderProduct[pos].ral == undefined) {
                        return false;
                    }
                }
            }

        }

        function grau() {

            for (let i = 0; i < stringLength; i++) {
                for (let x = 0; x < _grau.length; x++) {
                    let relevantLength = zeichen[i].index + _grau[x].Farbe.length;
                    let _prKey = prdktString.slice(zeichen[i].index, relevantLength);

                    if (_grau[x].Farbe == _prKey) {
                        orderProduct[pos].ral = _grau[x].Nummer;
                        return true;
                    }

                    if (i == stringLength - 1 && orderProduct[pos].ral == undefined) {
                        return false;
                    }
                }
            }

        }
    }
}

module.exports.func = func;


const validNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const farben_Holzschutzfarbe = [{
        Farbe: 'Weiß',
        Nummer: '0001'
    },
    {
        Farbe: 'weiß',
        Nummer: '0001'
    },
    {
        Farbe: 'Schwarz',
        Nummer: '0002'
    },
    {
        Farbe: 'schwarz',
        Nummer: '0002'
    },
    {
        Farbe: 'Grün',
        Nummer: '0003'
    },
    {
        Farbe: 'grün',
        Nummer: '0003'
    },
    {
        Farbe: 'Rotbraun',
        Nummer: '0004'
    },
    {
        Farbe: 'rotbraun',
        Nummer: '0004'
    },
    {
        Farbe: 'Farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'Beige',
        Nummer: '0005'
    },
    {
        Farbe: 'beige',
        Nummer: '0005'
    },
    {
        Farbe: 'Dunkelbraun',
        Nummer: '0006'
    },
    {
        Farbe: 'dunkelbraun',
        Nummer: '0006'
    },
    {
        Farbe: 'Schwedenrot',
        Nummer: '0007'
    },
    {
        Farbe: 'schwedenrot',
        Nummer: '0007'
    }
];

const farben_ausgeschrieben = [{
        Farbe: 'Weiß',
        Nummer: '9010'
    },
    {
        Farbe: 'weiß',
        Nummer: '9010'
    },
    {
        Farbe: 'Schwarz',
        Nummer: '9005'
    },
    {
        Farbe: 'schwarz',
        Nummer: '9005'
    },
    {
        Farbe: 'Grau',
        Nummer: '7001'
    },
    {
        Farbe: 'grau',
        Nummer: '7001'
    },
    {
        Farbe: 'Enzianblau',
        Nummer: '5010'
    },
    {
        Farbe: 'enzianblau',
        Nummer: '5010'
    },
    {
        Farbe: 'Feuerrot',
        Nummer: '3000'
    },
    {
        Farbe: 'feuerrot',
        Nummer: '3000'
    },
    {
        Farbe: 'Hellelfenbein',
        Nummer: '1015'
    },
    {
        Farbe: 'hellelfenbein',
        Nummer: '1015'
    },
    {
        Farbe: 'Lichtblau',
        Nummer: '5012'
    },
    {
        Farbe: 'lichtblau',
        Nummer: '5012'
    },
    {
        Farbe: 'Pastelltürkis',
        Nummer: '6034'
    },
    {
        Farbe: 'pastelltürkis',
        Nummer: '6034'
    },
    {
        Farbe: 'Schokoladenbraun',
        Nummer: '8017'
    },
    {
        Farbe: 'schokoladenbraun',
        Nummer: '8017'
    },
    {
        Farbe: 'Ultramarineblau',
        Nummer: '5002'
    },
    {
        Farbe: 'ultramarineblau',
        Nummer: '5002'
    },
    {
        Farbe: 'Farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'Beige',
        Nummer: '1001'
    },
    {
        Farbe: 'beige',
        Nummer: '1001'
    }
];

const farben_Holzlasur = [{
        Farbe: 'Birke',
        Nummer: '0008'
    },
    {
        Farbe: 'birke',
        Nummer: '0008'
    },
    {
        Farbe: 'Kiefer',
        Nummer: '0009'
    },
    {
        Farbe: 'kiefer',
        Nummer: '0009'
    },
    {
        Farbe: 'Pinie',
        Nummer: '0010'
    },
    {
        Farbe: 'pinie',
        Nummer: '0010'
    },
    {
        Farbe: 'Lärche',
        Nummer: '0010'
    },
    {
        Farbe: 'lärche',
        Nummer: '0010'
    },
    {
        Farbe: 'Farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'farblos',
        Nummer: '0000'
    },
    {
        Farbe: 'Eiche Hell',
        Nummer: '0011'
    },
    {
        Farbe: 'eiche hell',
        Nummer: '0011'
    },
    {
        Farbe: 'Teak',
        Nummer: '0012'
    },
    {
        Farbe: 'teak',
        Nummer: '0012'
    },
    {
        Farbe: 'Kastanie',
        Nummer: '0013'
    },
    {
        Farbe: 'kastanie',
        Nummer: '0013'
    },
    {
        Farbe: 'Nussbaum',
        Nummer: '0014'
    },
    {
        Farbe: 'nussbaum',
        Nummer: '0014'
    },
    {
        Farbe: 'Mahagoni',
        Nummer: '0015'
    },
    {
        Farbe: 'mahagoni',
        Nummer: '0015'
    },
    {
        Farbe: 'Palisander',
        Nummer: '0016'
    },
    {
        Farbe: 'palisander',
        Nummer: '0016'
    },
    {
        Farbe: 'Silbergrau',
        Nummer: '0017'
    },
    {
        Farbe: 'silbergrau',
        Nummer: '0017'
    },
    {
        Farbe: 'Ebenholz',
        Nummer: '0018'
    },
    {
        Farbe: 'ebenholz',
        Nummer: '0018'
    }
];

const _grau = [{
        Farbe: 'Silbergrau',
        Nummer: '7001'
    },
    {
        Farbe: 'silbergrau',
        Nummer: '7001'
    },
    {
        Farbe: 'Anthrazitgrau',
        Nummer: '7016'
    },
    {
        Farbe: 'anthrazitgrau',
        Nummer: '7016'
    },
    {
        Farbe: 'Kieselgrau',
        Nummer: '7032'
    },
    {
        Farbe: 'kieselgrau',
        Nummer: '7032'
    },
    {
        Farbe: 'Platingrau',
        Nummer: '7036'
    },
    {
        Farbe: 'platingrau',
        Nummer: '7036'
    },
    {
        Farbe: 'Quarzgrau',
        Nummer: '7039'
    },
    {
        Farbe: 'quarzgrau',
        Nummer: '7039'
    },
    {
        Farbe: 'Steingrau',
        Nummer: '7030'
    },
    {
        Farbe: 'steingrau',
        Nummer: '7030'
    }
];

const _weiß = [{
        Farbe: 'Cremeweiß',
        Nummer: '9001'
    },
    {
        Farbe: 'cremeweiß',
        Nummer: '9001'
    },
    {
        Farbe: 'Perlweiß',
        Nummer: '1013'
    },
    {
        Farbe: 'perlweiß',
        Nummer: '1013'
    }
];