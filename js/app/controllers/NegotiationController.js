class NegotiationController {

    constructor() {
        const $ = document.querySelector.bind(document);
        this.inputDate = $("#date");
        this.inputNumberOfStocks = $("#numberOfStocks");
        this.inputValue = $("#value");
        this.negotiationList = new Bind(new NegotiationList(), new NegotiationView($("#negotiationView")), "clear", "addNegotiation");
        this.message = new Bind(new Message(), new MessageView($("#messageView")), "text");
    }

    add(event) {
        event.preventDefault();

        const negotiation = this.createNegotiation();
        this.negotiationList.addNegotiation(negotiation);
        this.message.text = "Negociação adicionada com sucesso";
        this.clearForm();
    }

    clear() {
        this.negotiationList.clear();
        this.message.text = "Negociações apagadas com sucesso!";
    }

    importNegotiations() {
        const service = new NegotiationService();
        Promise.all([
            service.getWeeklyNegotiations(),
            service.getLastWeeklyNegotiations(),
            service.getLastLastWeeklyNegotiations()
        ]).then(negotiations => {
            const myNewNegotiations = negotiations.reduce((flatArray, array) => flatArray.concat(array), []);
            this.onSuccessGetWeeklyNegotiations(myNewNegotiations);
        })
            .catch(error => this.onErrorGetWeeklyNegotiations(error));

        /*service.getWeeklyNegotiations()
            .then(negotiations => this.onSuccessGetWeeklyNegotiations(negotiations))
            .catch(error => this.onErrorGetWeeklyNegotiations(error));
        service.getWeeklyNegotiations(this.onErrorGetWeeklyNegotiations.bind(this), this.onSuccessGetWeeklyNegotiations.bind(this));
        service.getLastWeeklyNegotiations(this.onErrorGetWeeklyNegotiations.bind(this), this.onSuccessGetWeeklyNegotiations.bind(this));
        service.getLastLastWeeklyNegotiations(this.onErrorGetWeeklyNegotiations.bind(this), this.onSuccessGetWeeklyNegotiations.bind(this));*/
    }

    onSuccessGetWeeklyNegotiations(negotiations) {
        negotiations.forEach(element => this.negotiationList.addNegotiation(element));
    }

    onErrorGetWeeklyNegotiations(error) {
        this.message.text = error;
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

} 