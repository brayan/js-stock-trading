import DateHelper from "../helpers/DateHelper.js";
import Bind from "../helpers/Bind.js";
import NegotiationList from "../models/NegotiationList.js";
import Message from "../models/Message.js";
import Negotiation from "../models/Negotiation.js";
import NegotiationRepository from "../repository/NegotiationRepository.js";
import NegotiationService from "../services/NegotiationService.js";
import MessageView from "../views/MessageView.js";
import NegotiationView from "../views/NegotiationView.js";

export default class NegotiationController {

    constructor() {
        const $ = document.querySelector.bind(document);
        this.inputDate = $("#date");
        this.inputNumberOfStocks = $("#numberOfStocks");
        this.inputValue = $("#value");
        this.negotiationList = new Bind(new NegotiationList(), new NegotiationView($("#negotiationView")), "clear", "addNegotiation");
        this.message = new Bind(new Message(), new MessageView($("#messageView")), "text");
        this.repository = new NegotiationRepository();

        this.setup();
    }

    setup() {
        this.loadNegotiations();
        setInterval(() => {
            this.importNegotiations();
        }, 3000);
    }

    add(event) {
        event.preventDefault();

        const negotiation = this.createNegotiation();

        this.repository.add(negotiation).then(() => {
            this.negotiationList.addNegotiation(negotiation);
            this.message.text = "Negociação adicionada com sucesso";
            this.clearForm();
        })
            .catch(error => {
                this.message.text = error;
            });
    }

    clear() {
        this.repository.deleteAll()
            .then(() => {
                this.negotiationList.clear();
                this.message.text = "Negociações apagadas com sucesso!";
            })
            .catch(error => {
                this.message.text = error;
            });
    }

    loadNegotiations() {
        this.repository.getAll()
            .then(negotiations => {
                negotiations.forEach(negotiation => {
                    this.negotiationList.addNegotiation(negotiation);
                });
            })
            .catch(error => {
                this.message.text = error;
            });
    }

    importNegotiations() {
        const service = new NegotiationService();
        service.importNegotiations(this.negotiationList.negotiations)
            .then(negotiations => this.onSuccessGetWeeklyNegotiations(negotiations))
            .catch(error => this.onErrorGetWeeklyNegotiations(error));
    }

    onSuccessGetWeeklyNegotiations(negotiations) {
        negotiations.forEach(element => this.negotiationList.addNegotiation(element));
    }

    onErrorGetWeeklyNegotiations(error) {
        this.message.text = error;
    }

    createNegotiation() {
        const newDate = DateHelper.parseTextToDate(this.inputDate.value);
        const numberOfStocks = parseInt(this.inputNumberOfStocks.value);
        const value = parseFloat(this.inputValue.value);
        return new Negotiation(newDate, numberOfStocks, value);
    }

    clearForm() {
        this.inputDate.value = "";
        this.inputNumberOfStocks.value = 1;
        this.inputValue.value = 0.0;

        this.inputDate.focus();
    }

} 