const DATABASE_NAME = "aluraframe";
const DATABASE_VERSION = 3;
const STORES = ["negotiations"];

let connection = null;
let close = null;

export default class ConnectionFactory {

    constructor() {
        throw new Error("It's not possible to create ConnectionFactory instances");
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            const openRequest = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

            openRequest.onupgradeneeded = (event) => {
                const result = event.target.result;
                createStores(result);
            };

            openRequest.onsuccess = (event) => {
                if (!connection) {
                    connection = event.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function () {
                        throw new Error("Can not close a connection directly.");
                    };
                }
                resolve(connection);
            };

            openRequest.onerror = (event) => {
                closeConnection();
                console.log(e.target.error);
                reject(event.target.error.name);
            };
        });
    }

}

const createStores = (connection) => {
    STORES.forEach(store => {
        const names = connection.objectStoreNames;

        if (names.contains(store)) {
            connection.deleteObjectStore(store);
        }

        connection.createObjectStore(store, { autoIncrement: true });
    });
}

const closeConnection = () => {
    if (connection) {
        console.log("Closing the connection");
        close();
        connection = null;
    } else {
        console.log("No connections to close");
    }
}