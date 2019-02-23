class NegotiationController {

    constructor() {
        const $ = document.querySelector.bind(document);
        this.inputDate = $("#date");
        this.inputNumberOfStocks = $("#numberOfStocks");
        this.inputValue = $("#value");
        this.negotiationList = new NegotiationList();
        this.negotiationView = new NegotiationView($("#negotiationView"));
        this.message = new Message();
        this.messageView = new MessageView($("#messageView"));

        this.updateViews();
    }
    
    add(event) {
        event.preventDefault();

        const negotiation = this.createNegotiation();
        this.negotiationList.addNegotiation(negotiation);
        this.message.text = "Negociação adicionada com sucesso";
        this.updateViews();
        this.clearForm();
    }

    createNegotiation() {
        const newDate = DateHelper.parseTextToDate(this.inputDate.value);
        return new Negotiation(newDate, this.inputNumberOfStocks.value, this.inputValue.value);
    }

    clearForm() {
        this.inputDate.value = "";
        this.inputNumberOfStocks.value = 1;
        this.inputValue.value = 0.0;

        this.inputDate.focus();
    }

    updateViews() {
        this.negotiationView.update(this.negotiationList);
        this.messageView.update(this.message);
    }
    
} 