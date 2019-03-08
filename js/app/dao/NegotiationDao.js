import Negotiation from "../models/Negotiation.js";

export default class NegotiationDao {

    constructor(connection) {
        this.connection = connection;
        this.store = "negotiations";
    }

    add(negotiation) {
        return new Promise((resolve, reject) => {
            const request = this.getNegotiationStore().add(negotiation);

            request.onsuccess = (event) => resolve();

            request.onerror = (event) => {
                console.log(event.target.error);
                reject("Could not include negotiation");
            }
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const cursor = this.getNegotiationStore().openCursor();

            const negotiations = [];

            cursor.onsuccess = (event) => {
                const current = event.target.result;

                if (current) {
                    const data = current.value;
                    negotiations.push(new Negotiation(data._date, data._numberOfStocks, data._value));
                    current.continue();
                } else {
                    resolve(negotiations);
                }
            }

            cursor.onerror = (event) => {
                console.log(event.target.error.name);
                reject("Could not get all negotiations.");
            };
        });
    }

    deleteAll() {
        return new Promise((resolve, reject) => {
            const result = this.getNegotiationStore().clear();
            result.onsuccess = (event) => resolve();
            result.onerror = (event) => reject("Could not delete all negotiations.");
        });
    }

    getNegotiationStore() {
        return this.connection
            .transaction([this.store], "readwrite")
            .objectStore(this.store);
    }

}