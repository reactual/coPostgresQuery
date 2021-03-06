export default function init(entry, options) {
    const handlers = [];

    return {
        use(fn, target) {
            handlers.push({ fn, target });
            return this;
        },
        execute(emptyResult) {
            return handlers
            .reduce((result, { fn, target }) =>
                fn(target ? entry[target] || {} : entry, options, result),
                emptyResult
            );
        },
    };
}
