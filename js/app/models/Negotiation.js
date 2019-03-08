export default class Negotiation {

     constructor(date, numberOfStocks, value) {
        this._date = new Date(date.getTime());
        this._numberOfStocks = numberOfStocks;
        this._value = value;
        Object.freeze(this);
    }

    calculateVolume() {
        return this._numberOfStocks * this._value;
    }

    get date() {
        return new Date(this._date.getTime());
    }

    get numberOfStocks() {
        return this._numberOfStocks;
    }

    get value() {
        return this._value;
    }

}