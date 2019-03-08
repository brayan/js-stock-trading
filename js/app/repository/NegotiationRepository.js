import ConnectionFactory from "../services/ConnectionFactory.js";
import NegotiationDao from "../dao/NegotiationDao.js";

export default class NegotiationRepository {

    add(negotiation) {
        return ConnectionFactory.getConnection()
            .then(connection => new NegotiationDao(connection))
            .then(dao => dao.add(negotiation));
    }

    deleteAll() {
        return ConnectionFactory.getConnection()
            .then(connection => new NegotiationDao(connection))
            .then(dao => dao.deleteAll())
    }

    getAll() {
        return  ConnectionFactory.getConnection()
        .then(connection => new NegotiationDao(connection))
        .then(dao => dao.getAll());
    }

}