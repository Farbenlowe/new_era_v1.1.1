// IMPORTE
const merge = require('easy-pdf-merge');
const fs = require('fs');

const getBrand = require('./pg_modules/getBrand');
const getProduct = require('./pg_modules/getProduct');
const getGloss = require('./pg_modules/getGloss');
const getRal = require('./pg_modules/getRal');
const getSize = require('./pg_modules/getSize');
const createID = require('./pg_modules/createID');
const createPath = require('./pg_modules/createPath');
const reqProductID = require('./pg_modules/reqProductID');
const meldung = require('./pg_modules/meldungen');


// GLOBALE VARIABLEN
global.orderProduct = [];


// DEKLARATION
let orderResponse = {};

let pdf_merger_id;


function resPasser(res, pmi) {
    orderResponse = res;
    pdf_merger_id = pmi;
}


let Order = {

    //Properties
    length: 0,


    //Methods
    createdAt: () => {
        return orderResponse.Data.CreatedAt;
    },

    product: (i) => {
        return orderResponse.Data.OrderItems[i].Product;
    },
    createObjects: () => {

        Order.length = orderResponse.Data.OrderItems.length;

        console.log(`ORDERLENGTH: ${Order.length}`);

        for (let i = 0; i < Order.length; i++) {

            orderProduct[i] = new OrderProduct(
                orderResponse.Data.OrderItems[i].Product.Title,
                orderResponse.Data.OrderItems[i].Quantity,
                orderResponse.Data.OrderItems[i].Attributes,
                orderResponse.Data.OrderItems[i].Product.BillbeeId
            )

            if (i == Order.length - 1) {
                console.log(`OBJECT COUNT: ${orderProduct.length}`);
            }
        }
    }
};


class OrderProduct {
    constructor(titel, menge, attribute, id) {

        //Properties
        this.produktTitel = titel;
        this.titelBrickString = [];
        this.produktMenge = menge;
        this.produktAttribute = attribute;
        this.produktBillbeeId = id;

        this.marke;
        this.produkt;
        this.glanzgrad;
        this.ral;
        this.größe;
        this.id;
        this.path;

        //Methodes
        this.titleBreakDown = function() {
            class Zeichen {
                constructor(name, indicator, index) {
                    this.name = name;
                    this.indicator = indicator;
                    this.index = index;
                }
            }

            let stringLength = this.produktTitel.length;

            for (let i = 0; i < stringLength; i++) {
                let _zeichen = 'zeichen' + i;
                let indicator = this.produktTitel.slice(i, i + 1);
                this.titelBrickString[i] = new Zeichen(_zeichen, indicator, i);
            }
        }
        this.getBrand = (i) => getBrand.func(i);
        this.getProduct = (i) => getProduct.func(i);
        this.getGloss = (i) => getGloss.func(i);
        this.getRal = (i) => getRal.func(i);
        this.getSize = (i) => getSize.func(i);
        this.createID = (i) => createID.func(i);
        this.createPath = (i) => createPath.func(i);
        this.createPathHeavy = (i) => {
            this.titleBreakDown(i);
            getProduct.func(i);
            getBrand.func(i);
            getRal.func(i);
            getSize.func(i);
            getGloss.func(i);
            let check = createID.func(i);
            if (check[0] == 'err' || 'del') {
                return check
            } else {
                createPath.func(i);
                return check;
            }
        }
        this.reqProductID = (i) => reqProductID.func(i);
    }
}


let pdfHandler = {

    //Properties
    paths: [],
    pathCloud: [],
    finalPath: 0,

    //Methods
    mergePdfs: function(pdf_merger_id) {
        console.log('PDF-HANDLER STARTS MERGING');

        for (let i = 0; i < this.paths.length; i++) {
            this.paths[i] = 'public/' + this.paths[i];
        }

        merge(pdfHandler.paths, 'public/merged/file_output_' + pdf_merger_id + '.pdf', function(err) {
            if (err) {
                pdfHandler.finalPath = 'public/merged/file_output_' + pdf_merger_id + '.pdf';
                pdfHandler.pathCloud.push(pdfHandler.finalPath)
                pdfHandler.paths = [];
                meldung.endProcessing();
                return console.log(err);
            }
            console.log('PDF-HANDLER SUCCESFULLY CREATED NEW FILE');
            pdfHandler.finalPath = 'public/merged/file_output_' + pdf_merger_id + '.pdf';
            pdfHandler.pathCloud.push(pdfHandler.finalPath)
            pdfHandler.paths = [];
            meldung.endProcessing();
        });
    },
    clearCloud: () => {
        if (pdfHandler.pathCloud.length > 20) {
            let del_path = 'public/' + pdfHandler.pathCloud[0];

            if (fs.existsSync(del_path)) {
                fs.unlink(del_path, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log('PDF-HANDLER DELETED FILE: (' + del_path + ')');
                });
            }

            pdfHandler.pathCloud.pop();
        }
    }
}


// NEW ERA V1.1.1
function path_gen() {

    console.log('- START PROCESSING -');

    Order.createObjects();

    if (orderResponse) {

        /*
        for (let i = 0; i < Order.length; i++) {

            async function req() {
                let id = await orderProduct[i].reqProductID(i);
                orderProduct[i].id = id;
                orderProduct[i].createPath(i);
            }
            req();
        }
        */


        orderProduct[0].titleBreakDown(0);
        orderProduct[0].getProduct(0);
        if (orderProduct[0].produkt == 'X300' && Order.length == 1) {
            return 'Lackierset'
        }

        for (let i = 0; i < orderProduct.length; i++) {
            if (!orderProduct[i].path) {

                let errCheck = orderProduct[i].createPathHeavy(i);

                if (errCheck[0] == 'del') {
                    i--;
                }

                if (errCheck[0] == 'err') {
                    meldung.error406(errCheck[1]);
                    return 'err'
                }
            }
        }

        if (Order.length > 1) {

            let i, x;

            for (i = 0; i < orderProduct.length; i++) {

                console.log(`OBJECT ${i} HAS THE FOLLOWING PATH: ${orderProduct[i].path}`);

                for (x = 0; x < orderProduct[i].produktMenge; x++) {
                    pdfHandler.paths.unshift(orderProduct[i].path);
                }
            }

            pdfHandler.mergePdfs(pdf_merger_id);
            pdfHandler.clearCloud();

            let finalMergedPath = 'merged/file_output_' + pdf_merger_id + '.pdf';

            return finalMergedPath

        } else if (orderProduct[0].produktMenge > 1) {

            for (let y = 0; y < orderProduct[0].produktMenge; y++) {
                pdfHandler.paths.unshift(orderProduct[0].path);
            }

            pdfHandler.mergePdfs(pdf_merger_id);
            pdfHandler.clearCloud();

            let finalMergedPath = 'merged/file_output_' + pdf_merger_id + '.pdf';

            return finalMergedPath;

        } else {

            meldung.endProcessing();

            return orderProduct[0].path
        }
    }
}


// EXPORTE
module.exports.resPasser = resPasser;
module.exports.path_gen = path_gen;