class NegotiationList {

    constructor() {
        this._negotiations = [];
    }

    addNegotiation(negotiation) {
        this._negotiations.push(negotiation);
    }

    clear() {
        this._negotiations = [];
    }

    get negotiations() {
        return [].concat(this._negotiations);
    }

    calculateVolume() {
        return this._negotiations.reduce((total, negotiation) => (total + negotiation.calculateVolume()), 0.0);
    }

}