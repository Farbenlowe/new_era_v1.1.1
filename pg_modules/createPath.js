function func(pos) {

    if (orderProduct) {

        String.prototype.replaceAt = function(index, replacement) {
            return this.substr(0, index) + replacement + this.substr(index + replacement.length);
        };

        let replaced = (orderProduct[pos].id.replaceAt(5, "xxxxx"));

        let path = 'etiketten_alle/' + replaced + '.pdf';

        orderProduct[pos].path = path;

    }
}

module.exports.func = func;