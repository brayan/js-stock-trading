export default class Message {
    
    constructor(text = "") {
        this._text = text;
    }

    set text(text) {
        this._text = text;
    }

    get text() {
        return this._text;
    }

}