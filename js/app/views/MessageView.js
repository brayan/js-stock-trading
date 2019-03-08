import BaseView from "./BaseView.js";

export default class MessageView extends BaseView {

    constructor(element) {
        super(element);
    }

    template(message) {
        return message.text ? `<p class="alert alert-info">${message.text}</p>` : "<p></p>";
    }

}