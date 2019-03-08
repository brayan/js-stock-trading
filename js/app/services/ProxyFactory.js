export default class ProxyFactory {

    static create(object, props, action) {
        return new Proxy(object, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory.isFunction(target[prop])) {
                    return function () {
                        const result = Reflect.apply(target[prop], target, arguments);
                        action(target);
                        return result;
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                const result = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) {
                    action(target);
                }
                return result;
            }
        });
    }

    static isFunction(fun) {
        return (typeof (fun) == typeof (Function));
    }

}