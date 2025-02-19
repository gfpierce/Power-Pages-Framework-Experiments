let current;

export function createSignal(initialValue) {
    let value = initialValue;
    const subscribers = [];

    function set(newValue) {
        value = newValue;
        subscribers.forEach(sub => sub());
    }

    function read() {
        subscribers.push(current);
        return value;
    }

    return [read, set];
}

export function effect(fn) {
    current = fn;

    fn();

    current = null;
}