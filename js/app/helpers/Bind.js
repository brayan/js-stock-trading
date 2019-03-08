import ProxyFactory from "../services/ProxyFactory.js";

export default class Bind {

    constructor(model, view, ...props) {
        const proxy = ProxyFactory.create(model, props, (model) => {
            view.update(model);
        });
        return proxy;
    }

}