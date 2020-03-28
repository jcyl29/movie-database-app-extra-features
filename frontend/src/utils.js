const debounce = function(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const bound = function() {
            func.apply(context, args)
            timeout = null;
        }

        if (timeout) {
            clearTimeout((timeout))
        }

        timeout = setTimeout(bound, delay)
    }
}

export default debounce