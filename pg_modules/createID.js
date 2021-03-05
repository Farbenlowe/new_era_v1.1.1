function func(pos) {

    if (orderProduct) {

        let code = '';

        /*___PRODUKT___*/

        switch (orderProduct[pos].produkt) {
            case '2K-Klarlack':
            case '2K Klarlack':
                code = code + 'ZK';
                break;
            case '2K-Grundierung':
            case '2-K Grundierung':
                code = code + 'ZG';
                break;
            case '3in1':
                code = code + 'DE';
                break;
            case 'Antischimmelfarbe':
                code = code + 'AS';
                break;
            case 'Autolack':
                code = code + 'AL';
                break;
            case 'Badewannenlack':
                code = code + 'BW';
                break;
            case 'Betonfarbe':
                code = code + 'BF';
                break;
            case 'Bootslack':
                code = code + 'BL';
                break;
            case '2K Bootslack':
                code = code + 'ZB';
                break;
            case 'Buntlack':
            case 'Bunt-Lack':
                code = code + 'BN';
                break;
            case 'Fliesenlack':
                code = code + 'FL';
                break;
            case 'Holzlasur':
            case 'Holz-Lasur':
                code = code + 'HL';
                break;
            case 'Holzschutzfarbe':
                code = code + 'HS';
                break;
            case 'X300':
                code = code + 'LS';
                break;
            case 'Metallschutzlack':
            case 'Metallschutz-lack':
                code = code + 'MS';
                break;
            case 'Parkettlack':
            case 'PARKETTLACK':
                code = code + 'PL';
                break;
            case 'Rostschutzfarbe':
                code = code + 'RS';
                break;
            case 'Schwimmbeckenfarbe':
                code = code + 'SB';
                break;
            case '2K Schwimmbeckenfarbe':
                code = code + 'ZS';
                break;
            case 'erdünnung 227':
                code = code + 'VZ';
                break;
            case 'erdünnung 2K/400':
                code = code + 'VV';
                break;
            case 'erdünnung 700':
                code = code + 'VS';
                break;
            case 'PU Holzschutzfarbe':
                code = code + 'PU';
                break;
        };

        if (code.length < 2) {
            let err = ['err', 'Produkt fehlt'];
            return err
        }

        if (code == 'LS') {
            orderProduct.splice(pos, 1);
            let err = ['del'];
            return err
        }

        /*___MENGE___*/

        switch (orderProduct[pos].größe) {
            case '0,5L':
            case '0,5L':
            case '0,5 L':
            case '0,5 L':
            case '0,5kg':
            case '0,5kg':
            case '0,5 kg':
            case '0,5 kg':
            case '0,5 L)':
            case '0.5 L':
            case '0.5L':
            case '0.5 l':
            case '0.5l':
            case '0.5 Kg':
            case '0.5Kg':
            case '0.5 kg':
            case '0.5kg':
                code = code + '005';
                break;

            case '1L':
            case '1l':
            case '1 L':
            case '1 l':
            case '1kg':
            case '1Kg':
            case '1 kg':
            case '1 Kg':
                code = code + '010';
                break;

            case '2,5l':
            case '2,5L':
            case '2,5 l':
            case '2,5 L':
            case '2,5kg':
            case '2,5Kg':
            case '2,5 kg':
            case '2,5 Kg':
            case '2.5 L':
            case '2.5L':
            case '2.5 l':
            case '2.5l':
            case '2.5 Kg':
            case '2.5Kg':
            case '2.5 kg':
            case '2.5kg':
            case '2½ L':
                code = code + '025';
                break;

            case '5L':
            case '5l':
            case '5 L':
            case '5 l':
            case '5kg':
            case '5Kg':
            case '5 kg':
            case '5 Kg':
                code = code + '050';
                break;

            case '10L':
            case '10l':
            case '10 L':
            case '10 l':
            case '10kg':
            case '10Kg':
            case '10 kg':
            case '10 Kg':
                code = code + '100';
                break;

            case '20L':
            case '20l':
            case '20 L':
            case '20 l':
            case '20kg':
            case '20Kg':
            case '20 kg':
            case '20 Kg':
                code = code + '200';
                break;

            case '30L':
            case '30l':
            case '30 L':
            case '30 l':
            case '30kg':
            case '30Kg':
            case '30 kg':
            case '30 Kg':
                code = code + '300';
                break;

        };

        if (code.length < 5) {
            let err = ['err', 'Menge fehlt'];
            return err
        }

        /*___GLANZ___*/

        switch (orderProduct[pos].glanzgrad) {
            case 'matt':
            case 'MATT':
                code = code + 'M';
                break;

            case 'seidenmatt':
            case 'SEIDENMATT':
                code = code + 'S';
                break;

            case 'glänzend':
            case 'GLÄNZEND':
                code = code + 'G';
                break;
        };

        if (code.length < 6) {
            let err = ['err', 'Glanzgrad fehlt'];
            return err
        }

        /*___RAL___*/

        if (orderProduct[pos].ral == undefined) {
            code = code + '0000'
        } else {
            code = code + orderProduct[pos].ral;
        }

        if (code.length < 10) {
            let err = ['err', 'RAL fehlt'];
            return err
        }

        /*___MARKE___*/

        switch (orderProduct[pos].marke) {
            case "FARBENLÖWE":
            case 'Farben Löwe':
                code = code + 'A';
                break;
            case "Goldmeister Farben":
                code = code + 'B';
                break;
            case "Grünwalder":
                code = code + 'C';
                break;
            case "Halvar":
                code = code + 'D';
                break;
            case "Hamburger Lack-Profi":
            case "Hamburger Profi-Lack":
                code = code + 'E';
                break;
            case "Lausitzer Farbwerke":
                code = code + 'F';
                break;
            case "Paint IT!":
            case "Paint IT":
                code = code + 'G';
                break;
            case "The Flynn":
                code = code + 'H';
                break;
        };

        if (code.length < 11) {
            let err = ['err', 'Marke fehlt'];
            return err
        }

        orderProduct[pos].id = code;
        let err = ['none', 'none'];
        return err
    }
}

module.exports.func = func;