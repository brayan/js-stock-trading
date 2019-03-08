import HttpService from "./HttpService.js";
import Negotiation from "../models/Negotiation.js";

export default class NegotiationService {

    getWeeklyNegotiations() {
        const url = "http://localhost:3000/negociacoes/semana";
        const errorMessage = "Ocorreu um erro ao importar as negociações da semana atual."
        return getNegotiationsFromApi(url, errorMessage);
    }

    getLastWeeklyNegotiations() {
        const url = "http://localhost:3000/negociacoes/anterior";
        const errorMessage = "Ocorreu um erro ao importar as negociações da semana passada."
        return getNegotiationsFromApi(url, errorMessage);
    }

    getLastLastWeeklyNegotiations() {
        const url = "http://localhost:3000/negociacoes/retrasada";
        const errorMessage = "Ocorreu um erro ao importar as negociações da semana retrasada."
        return getNegotiationsFromApi(url, errorMessage);
    }

    getAll() {
        return Promise.all([
            this.getWeeklyNegotiations(),
            this.getLastWeeklyNegotiations(),
            this.getLastLastWeeklyNegotiations()
        ]).then(negotiations =>
            negotiations.reduce((flatArray, array) => flatArray.concat(array), []));
    }

    importNegotiations(currentList) {
        return this.getAll()
            .then(negotiations =>
                negotiations.filter(negotiation =>
                    !currentList.some(negotiationExistent =>
                        JSON.stringify(negotiation) == JSON.stringify(negotiationExistent)))
            );
    }

}

const getNegotiationsFromApi = (url, errorMessage) => {
    return new Promise((resolve, reject) => {
        HttpService.get(url).then(jsonResponse => {
            const negotiations = jsonResponse.map(object => new Negotiation(new Date(object.data), object.quantidade, object.valor));
            resolve(negotiations);
        })
            .catch(error => {
                console.log(error);
                reject(errorMessage);
            });
    })

}